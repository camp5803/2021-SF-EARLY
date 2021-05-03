CREATE TABLE register(
    uuid INT NOT NULL AUTO_INCREMENT,
    id VARCHAR(15) NOT NULL,
    passwd VARCHAR(88) NOT NULL,
    nickname VARCHAR(30) NOT NULL,
    mem_type VARCHAR(5) NOT NULL,
    email VARCHAR(50) NOT NULL,
    PRIMARY KEY(uuid),
    UNIQUE INDEX rid (id ASC),
    UNIQUE INDEX remail (email ASC)
)
COMMENT = '아집에가고싶다',
DEFAULT CHARSET = utf8,
ENGINE = InnoDB;

CREATE TABLE score(
    uuid INT NOT NULL,
    solved_num TINYINT UNSIGNED NOT NULL DEFAULT 0,
    nickname VARCHAR(30) NOT NULL,
    uscore INT NOT NULL DEFAULT 0,
    rank TINYINT UNSIGNED,
    usolved_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fid_score FOREIGN KEY(uuid) REFERENCES register(uuid) ON DELETE CASCADE,
    CONSTRAINT pid_option PRIMARY KEY(uuid)
)
COMMENT = '너무집에가고싶다',
DEFAULT CHARSET = utf8,
ENGINE = InnoDB;

CREATE TABLE Week2(
    uid int NOT NULL auto_increment primary key,
    id VARCHAR(20) NOT NULL,
    password VARCHAR(88) NOT NULL
    )
COMMENT = 'WEB 2주차',
DEFAULT CHARSET = utf8,
ENGINE = InnoDB;