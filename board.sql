CREATE TABLE chall(
    puid INT NOT NULL AUTO_INCREMENT,
    pname VARCHAR(60) NOT NULL,
    prob_type VARCHAR(9) NOT NULL,
    pscore INT NOT NULL,
    prob_info TEXT NOT NULL,
    prob_flag VARCHAR(100) NOT NULL,
    csolved_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    active TINYINT(1) NOT NULL DEFAULT false,
    PRIMARY KEY(puid)
)
COMMENT = '1',
DEFAULT CHARSET = utf8,
ENGINE = InnoDB;

CREATE TABLE solver(
    suid INT NOT NULL AUTO_INCREMENT,
    puid INT NOT NULL,
    uuid INT NOT NULL,
    pscore INT NOT NULL,
    solved_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(suid),
    CONSTRAINT puid_solver FOREIGN KEY(puid) REFERENCES boards.chall(puid) ON DELETE CASCADE,
    CONSTRAINT uuid_solver FOREIGN KEY(uuid) REFERENCES users.register(uuid) ON DELETE CASCADE
)
COMMENT = '2',
DEFAULT CHARSET = utf8,
ENGINE = InnoDB;

CREATE TABLE notice(
    nuid INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(150) NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(nuid)
)
COMMENT = '3',
DEFAULT CHARSET = utf8,
ENGINE = InnoDB;

// uscore, nickname은 알아서 빼와야 할 듯
// 어차피 uuid도 빼와야 하니 users.register에서 먹여야 함

CREATE TABLE filedata(
    fuid INT NOT NULL AUTO_INCREMENT,
    puid INT NOT NULL,
    filename VARCHAR(40) NOT NULL,
    file_path VARCHAR(40) NOT NULL DEFAULT 'fileupload/',
    size INT NOT NULL,
    CONSTRAINT puid_filedata FOREIGN KEY(puid) REFERENCES boards.chall(puid) ON DELETE CASCADE,
    PRIMARY KEY(fuid)
)
COMMENT = '거의 다 끝났다'
DEFAULT CHARSET = utf8,
ENGINE = InnoDB;