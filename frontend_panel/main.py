import streamlit as st
import psycopg2
import time
import hashlib
from streamlit_option_menu import option_menu
import pandas
import toml
import subprocess

st.title("CWL Bełchatów")
print("Local db connection")
if "stage" not in st.session_state:
    st.session_state["stage"] = 0

def get_db_connection():
    
    return psycopg2.connect(
        host="db",
        database="postgres",
        user="postgres",
        password="cwlbełchatów"
    )

def checkLogin(username, password):
    con = get_db_connection()
    cur = con.cursor()
    cur.execute("SELECT password FROM users WHERE username = %s", (username,))
    result = cur.fetchone()
    con.close()

    if result is None:
        return False
    
    stored_password = result[0]
    passwordHash = hashlib.sha256(password.encode()).hexdigest()
    return stored_password == passwordHash

def dodaj_zwierze():
    st.header("Dodaj nowe zwierzę")
    name = st.text_input("Nazwa zwierzęcia")
    species = st.text_input("Gatunek")
    age = st.number_input("Wiek", min_value=0)
    race = st.text_input("Rasa")
    color = st.text_input("Kolor")
    photo = st.text_input("Zdjęcie")
    number = st.text_input("Numer")
    illnesses = st.text_input("Choroby")

    submit = st.button("Dodaj zwierzę")
    
    if submit:
        con = get_db_connection()
        cur = con.cursor()
        cur.execute("INSERT INTO dogs (name, race, color, photo, number, illnesses) VALUES (%s, %s, %s, %s, %s, %s)", (name, race, color, photo, number, illnesses))
        con.commit()
        con.close()
        st.success(f"Zwierzę {name} zostało dodane pomyślnie!")

def usun_zwierze():
    st.header("Usuń zwierzę")
    con = get_db_connection()
    cur = con.cursor()
    cur.execute("SELECT id, name FROM dogs")
    rows = cur.fetchall()
    con.close()

    df = pandas.DataFrame(rows, columns=["ID", "Imię"])
    animal_options = df['ID'].astype(str) + " - " + df['Imię']
    selected_animal = st.selectbox("Wybierz zwierzę do usunięcia", animal_options)

    if st.button("Usuń zwierzę"):
        animal_id = int(selected_animal.split(" - ")[0])
        con = get_db_connection()
        cur = con.cursor()
        cur.execute("DELETE FROM dogs WHERE id = %s", (animal_id,))
        con.commit()
        con.close()
        st.success("Zwierzę zostało usunięte pomyślnie!")
        time.sleep(1)
        st.rerun()

def registerWithHash(username, password):
    con = get_db_connection()
    cur = con.cursor()
    passwordHash = hashlib.sha256(password.encode()).hexdigest()
    cur.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, passwordHash))
    con.commit()
    con.close()

def login_form():
    with st.form("dd"):
        username = st.text_input("Nazwa użytkownika")
        password = st.text_input("Hasło", type='password')
        if st.form_submit_button("Zaloguj"):
            if checkLogin(username, password):
                st.success("Zalogowano")
                st.session_state['stage'] = 1
                time.sleep(1)
                st.rerun()
            else:
                st.error("Niepoprawne dane logowania")

def animal_list():
    con = get_db_connection()
    cur = con.cursor()
    cur.execute("SELECT id, name, race, color, photo, number, illnesses FROM dogs")
    rows = cur.fetchall()
    con.close()

    df = pandas.DataFrame(rows, columns=["ID", "Imię", "Rasa", "Kolor", "Zdjęcie", "Numer", "Choroby"])
    df['Zdjęcie'] = df['Zdjęcie'].apply(lambda x: f'<img src="{x}" width="100">' if x != 'brak' else 'brak')
    st.write(df.to_html(escape=False, index=False), unsafe_allow_html=True)

def register_user_form():
    with st.form("registeruser"):
        username = st.text_input("Nazwa użytkownika")
        password = st.text_input("Hasło", type='password')
        if st.form_submit_button("Zarejestruj"):
            registerWithHash(username, password)
            st.success("Zarejestrowano")
            time.sleep(1)
            st.rerun()
def serwer():
    st.write("Konfiguracja serwera")
    if st.button("Update"):
        commands = [
            "cd ~/CWLBD/frontend_public/",
            "docker pull ghcr.io/jmatuszczakk/cwlb-frontend_public",
            "docker compose down",
            "docker compose up -d"
        ]

        for command in commands:
            process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            stdout, stderr = process.communicate()
            if process.returncode != 0:
                st.error(f"Error executing command: {command}\n{stderr.decode('utf-8')}")
            else:
                st.write(f"Command executed successfully: {command}\n{stdout.decode('utf-8')}")


def change_design():
    st.write("Wybierz kolory")
    col1, col2 = st.columns(2)
    try:
        with open("./.streamlit/config.toml", "r") as f:
            config_data = toml.load(f)
            primaryColor = config_data["theme"].get("primaryColor", "#ff0000")
            backgroundColor = config_data["theme"].get("backgroundColor", "#ffffff")
            secondaryBackgroundColor = config_data["theme"].get("secondaryBackgroundColor", "#f0f0f0")
            textColor = config_data["theme"].get("textColor", "#000000")
    except FileNotFoundError:
        primaryColor = "#ff0000"
        backgroundColor = "#ffffff"
        secondaryBackgroundColor = "#f0f0f0"
        textColor = "#000000"

    with col1:
        primaryColor = st.color_picker("Kolor główny", primaryColor)
        backgroundColor = st.color_picker("Kolor tła", backgroundColor)
    with col2:
        secondaryBackgroundColor = st.color_picker("Kolor tła drugoplanowego", secondaryBackgroundColor)
        textColor = st.color_picker("Kolor tekstu", textColor)

    config = f"""

    
[theme]
primaryColor="{primaryColor}"
backgroundColor="{backgroundColor}"
secondaryBackgroundColor="{secondaryBackgroundColor}"
textColor="{textColor}"
    """



    if st.button("Zapisz"):
        with open("./.streamlit/config.toml", "w") as f:
            f.write(config)
        st.success("Zapisano")
        time.sleep(1)
        st.rerun()

    if st.button("Pobierz lokalny plik"):
        st.download_button("Pobierz plik", config, "config.toml", "toml")

if st.session_state['stage'] == 0:
    login_form()

if st.session_state['stage'] == 1:
    with st.sidebar:
        selected = option_menu("CWLB", ["Lista zwierząt", 'Dodaj zwierzę', 'Usuń zwierzę', 'Dodaj użytkownika', 'Zmień dizajn', 'Serwer'], 
        icons=['card-list', 'plus-lg', 'x-lg', 'person-plus', 'palette',], menu_icon="cast", default_index=0)
    if selected == "Lista zwierząt":
        animal_list()
    elif selected == "Dodaj zwierzę":
        dodaj_zwierze()
    elif selected == "Usuń zwierzę":
        usun_zwierze()
    elif selected == "Dodaj użytkownika":
        register_user_form()
    elif selected == "Zmień dizajn":
        change_design()
    elif selected == "Serwer":
        serwer()