# CWL Bełchatów Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Frontend Panel](#frontend-panel)
3. [Backend API](#backend-api)
4. [Database](#database)
5. [Environment Variables](#environment-variables)
6. [Ports](#ports)

## Introduction
CWL Bełchatów is a web application designed to manage animal records. This documentation provides an overview of the codebase, including the frontend panel, backend API, database schema, and environment variables.

## Frontend Panel
The frontend panel is built using Streamlit and includes several functionalities such as adding, removing, and listing animals, as well as user management and design customization.

### Main Functions
- **dodaj_zwierze**: Function to add a new animal.
- **usun_zwierze**: Function to remove an animal.
- **animal_list**: Function to list all animals.
- **register_user_form**: Function to register a new user.
- **change_design**: Function to change the design theme.

### Requirements
The `frontend_panel/requirements.txt` file includes the following dependencies:
- streamlit
- psycopg2-binary
- pandas
- streamlit-option-menu
- toml

## Backend API
The backend API is built using Flask and provides endpoints to interact with the database.

### Main Functions
- **insert_dog**: Function to insert a new dog record into the database.
- **create_connection**: Function to create a connection to the PostgreSQL database.
- **post_dog**: Endpoint to handle POST requests for adding a new dog.

### Requirements
The `backend_api/requirements.txt` file includes the following dependencies:
- flask
- flask_cors
- psycopg2-binary
- python-dotenv

## Database
The database schema includes tables for `dogs` and `users`. The `cwl1_dump.sql` file provides sample data and schema definitions.

### Sample Data
- Dogs table includes columns: id, name, race, color, photo, number, illnesses.
- Users table includes columns: id, username, password.

## Environment Variables
The `.env` file contains environment variables required for the application to run.


## Ports
The following ports are used by the application:

| Service       | Port |
|---------------|------|
| web-public    | 80   |
| web-panel     | 81   |
| api           | 5000 |
| db            | 5432 |
