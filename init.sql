CREATE TABLE IF NOT EXISTS pessoas (
    id VARCHAR(33) PRIMARY KEY,
    apelido VARCHAR(32) UNIQUE,
    nome VARCHAR(100),
    nascimento CHAR(10),
    stack VARCHAR(1024),
    busca_trgm TEXT GENERATED ALWAYS AS (
        LOWER(nome || apelido || stack)
    ) STORED
);

CREATE EXTENSION PG_TRGM;
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_pessoas_busca_trgm ON pessoas USING GIST (busca_trgm GIST_TRGM_OPS(SIGLEN=64));