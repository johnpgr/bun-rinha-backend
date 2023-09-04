CREATE TABLE IF NOT EXISTS pessoas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    apelido VARCHAR(32) NOT NULL UNIQUE,
    nome VARCHAR(100) NOT NULL,
    nascimento CHAR(10) NOT NULL,
    stack VARCHAR(1024),
    busca_trgm TEXT GENERATED ALWAYS AS (
        LOWER(nome || apelido || stack)
    ) STORED
);

CREATE EXTENSION PG_TRGM;
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_pessoas_busca_trgm ON pessoas USING GIST (busca_trgm GIST_TRGM_OPS(SIGLEN=64));