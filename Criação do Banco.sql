
CREATE SEQUENCE public.cidade_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.cidade_id_seq
    OWNER TO postgres;

CREATE SEQUENCE public.empresa_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.empresa_id_seq
    OWNER TO postgres;

CREATE SEQUENCE public.onibus_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.onibus_id_seq
    OWNER TO postgres;   

CREATE SEQUENCE public.passagem_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.passagem_id_seq
    OWNER TO postgres;   

CREATE SEQUENCE public.viagem_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.viagem_id_seq
    OWNER TO postgres;   

CREATE SEQUENCE public.rota_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 999999
    CACHE 1;

ALTER SEQUENCE public.rota_id_seq
    OWNER TO postgres;

CREATE SEQUENCE public.usuario_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.usuario_id_seq
    OWNER TO postgres;

CREATE TABLE public.usuario
(
    cpf text COLLATE pg_catalog."default" NOT NULL,
    nome text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    senha text COLLATE pg_catalog."default" NOT NULL,
    passagens integer[],
    id integer NOT NULL DEFAULT nextval('usuario_id_seq'::regclass),
    CONSTRAINT usuario_pkey PRIMARY KEY (cpf)
)

TABLESPACE pg_default;

ALTER TABLE public.usuario
    OWNER to postgres;

CREATE TABLE public.cidade
(
    id integer NOT NULL DEFAULT nextval('cidade_id_seq'::regclass),
    sigla text COLLATE pg_catalog."default" NOT NULL,
    nome text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT cidade_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.cidade
    OWNER to postgres;

CREATE TABLE public.empresa
(
    id integer NOT NULL DEFAULT nextval('empresa_id_seq'::regclass),
    nome text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    telefone text COLLATE pg_catalog."default" NOT NULL,
    cnpj text COLLATE pg_catalog."default" NOT NULL,
    logo bytea NOT NULL,
    senha text COLLATE pg_catalog."default" NOT NULL,
    onibus integer[],
    CONSTRAINT empresa_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.empresa
    OWNER to postgres;

CREATE TABLE public.onibus
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "cadeirasDisponiveis" integer[] NOT NULL,
    tipo text COLLATE pg_catalog."default" NOT NULL,
    imagem bytea NOT NULL,
    "numCadeiras" integer NOT NULL,
    placa text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT onibus_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.onibus
    OWNER to postgres;

CREATE TABLE public.rota
(
    id integer NOT NULL DEFAULT nextval('rota_id_seq'::regclass),
    destino integer NOT NULL,
    origem integer NOT NULL,
    distancia real,
    tempo time without time zone,
    onibus integer NOT NULL,
    CONSTRAINT rota_pkey PRIMARY KEY (id),
    CONSTRAINT destino_fkey FOREIGN KEY (destino)
        REFERENCES public.cidade (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT onibus_fkey FOREIGN KEY (onibus)
        REFERENCES public.onibus (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT origem_fkey FOREIGN KEY (origem)
        REFERENCES public.cidade (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.rota
    OWNER to postgres;

CREATE TABLE public.passagem
(
    id integer NOT NULL DEFAULT nextval('passagem_id_seq'::regclass),
    usuario text COLLATE pg_catalog."default" NOT NULL,
    plataforma text COLLATE pg_catalog."default" NOT NULL,
    rota integer NOT NULL,
    valor money NOT NULL,
    cadeira integer NOT NULL,
    "tipoOnibus" text COLLATE pg_catalog."default" NOT NULL,
    "dataCompra" date NOT NULL,
    "dataViagem" date NOT NULL,
    "horaViagem" time without time zone NOT NULL,
    empresa integer NOT NULL DEFAULT '-1'::integer,
    CONSTRAINT passagem_pkey PRIMARY KEY (id),
    CONSTRAINT empresa_fkey FOREIGN KEY (empresa)
        REFERENCES public.empresa (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT rota_fkey FOREIGN KEY (rota)
        REFERENCES public.rota (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT usuario_fkey FOREIGN KEY (usuario)
        REFERENCES public.usuario (cpf) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.passagem
    OWNER to postgres;

CREATE TABLE public.viagem
(
    id integer NOT NULL DEFAULT nextval('viagem_id_seq'::regclass),
    passagens integer[],
    rota integer NOT NULL,
    "cadeirasDisponiveis" integer NOT NULL,
    status text COLLATE pg_catalog."default" NOT NULL,
    empresa integer,
    data date NOT NULL,
    hora time without time zone NOT NULL,
    valor money NOT NULL,
    CONSTRAINT viagem_pkey PRIMARY KEY (id),
    CONSTRAINT empresa_fkey FOREIGN KEY (empresa)
        REFERENCES public.empresa (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE SET NULL
        DEFERRABLE
        NOT VALID,
    CONSTRAINT rota_fkey FOREIGN KEY (rota)
        REFERENCES public.rota (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE public.viagem
    OWNER to postgres;


