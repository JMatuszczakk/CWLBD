--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6 (Ubuntu 16.6-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.6 (Ubuntu 16.6-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: dogs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dogs (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    race character varying(100) NOT NULL,
    color character varying(50) NOT NULL,
    photo text,
    number character varying(20) NOT NULL,
    illnesses text
);


ALTER TABLE public.dogs OWNER TO postgres;

--
-- Name: dogs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dogs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.dogs_id_seq OWNER TO postgres;

--
-- Name: dogs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dogs_id_seq OWNED BY public.dogs.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: dogs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dogs ALTER COLUMN id SET DEFAULT nextval('public.dogs_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: dogs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dogs (id, name, race, color, photo, number, illnesses) FROM stdin;
2	Fido	Labrador	brown	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvDGB-OSNtYktOBhMsXrLsrFMcYJcyv-InBu59t9tJuFbFN6trcXI87u2vptTG-agSmhSBdCgEdpSXx83UADo4bA	123	none
7	test	pingwin	czarnobiały	https://zoo.wroclaw.pl/wp-content/uploads/2021/12/Header-X3-pingwin-toniec-webp.jpg	2137	adhd
9	Paweł	Koala	Szary	https://kids.earth.org/wp-content/uploads/2022/04/Untitled-1024-%C3%97-768px-2.jpg	1	brak
10	Puszek	Szop	Szary	https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSuBUtw8dd_g5NSG4bdhKDT3vbeuPUTM39lnB-Ik-HiYQue4LZbsf2LnlUT3ctkRJPbdw3avBrIHwBIq3kFjJhjpQ	1128	autyzm
11	Hampter	Biała	Biały	https://cziko.com.pl/data/include/img/news/1681807804.jpg	3326	komunizm
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password) FROM stdin;
4	admin	8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918
7	admin2	654475b9eef0ee645549340ae365bad7be41c1a693aaaa53a26811682763cdb0
8	admin3	34b37f1e6f801286d05a7818adf5c4f7542fff8a5d719bb3d832b7fa3bae4363
9	test_user	10a6e6cc8311a3e2bcc09bf6c199adecd5dd59408c343e926b129c4914f3cb01
\.


--
-- Name: dogs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dogs_id_seq', 11, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 9, true);


--
-- Name: dogs dogs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dogs
    ADD CONSTRAINT dogs_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- PostgreSQL database dump complete
--

