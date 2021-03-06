USE `nugurang`;

CREATE TABLE `article`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `thread` INT NOT NULL,
  `user` INT NOT NULL,
  `parent` INT,
  `title` VARCHAR(255),
  `content` TEXT NOT NULL,
  `view_count` INT NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT NOW(),
  `modified_at` DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`id`)
);

CREATE TABLE `board`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`name`)
);

CREATE TABLE `event`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `content` VARCHAR(255) NOT NULL,
  `recruiting_start` DATETIME NOT NULL,
  `recruiting_end` DATETIME NOT NULL,
  `event_start` DATETIME NOT NULL,
  `event_end` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`name`)
);

CREATE TABLE `following`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `from_user` INT NOT NULL,
  `to_user` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`from_user`, `to_user`)
);

CREATE TABLE `image`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `address` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`address`)
);

CREATE TABLE `notification`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(255) NOT NULL,
  `user` INT NOT NULL,
  `at` DATETIME NOT NULL DEFAULT NOW(),
  `article` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`user`, `article`)
);

CREATE TABLE `position`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`name`)
);

CREATE TABLE `progress`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`name`)
);

CREATE TABLE `project`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `team` INT NOT NULL,
  `event` INT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`team`, `name`)
);

CREATE TABLE `role`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
   PRIMARY KEY (`id`),
  UNIQUE (`name`)
);

CREATE TABLE `star`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `user` INT NOT NULL,
  `article` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`user`, `article`)
);

CREATE TABLE `tag`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`name`)
);

CREATE TABLE `task`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `work` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `order` INT NOT NULL,
  `progress` INT NOT NULL,
  `difficulty` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`work`, `name`),
  UNIQUE (`work`, `name`, `order`)
);

CREATE TABLE `team`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`name`)
);

CREATE TABLE `thread`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `user` INT NOT NULL,
  `user_team` INT NOT NULL,
  `board` INT NOT NULL,
  `event` INT,
  PRIMARY KEY (`id`)
);

CREATE TABLE `user`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `oauth2_provider` VARCHAR(255) NOT NULL,
  `oauth2_id` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `image` INT,
  `password` BINARY(60) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`name`),
  UNIQUE (`email`),
);

CREATE TABLE `vote`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `user` INT NOT NULL,
  `article` INT NOT NULL,
  `vote_type` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`user`, `article`)
);

CREATE TABLE `vote_type`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`name`)
);

CREATE TABLE `work`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `project` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `order` INT NOT NULL,
  `opened` BOOLEAN NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`project`, `name`),
  UNIQUE (`project`, `name`, `order`)
);

CREATE TABLE `xref_article_image`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `article` INT NOT NULL,
  `image` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`article`, `image`)
);

CREATE TABLE `xref_event_tag`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `event` INT NOT NULL,
  `tag` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`event`, `tag`)
);

CREATE TABLE `xref_event_image`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `event` INT NOT NULL,
  `image` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`event`, `image`)
);

CREATE TABLE `xref_task_position`
(
    `id` INT NOT NULL AUTO_INCREMENT,
    `task` INT NOT NULL,
    `position` INT NOT NULL,
    `honor` INT NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`),
    UNIQUE (`task`, `position`)
);

CREATE TABLE `xref_thread_tag`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `thread` INT NOT NULL,
  `tag` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`thread`, `tag`)
);

CREATE TABLE `xref_user_board`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `user` INT NOT NULL,
  `board` INT NOT NULL,
  `role` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`user`, `board`)
);

CREATE TABLE `xref_user_task`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `user` INT NOT NULL,
  `task` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`user`, `task`)
);

CREATE TABLE `xref_user_team`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `team` INT NOT NULL,
  `user` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`team`, `user`)
);

CREATE TABLE `xref_user_position`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `user` INT NOT NULL,
  `position` INT NOT NULL,
  `honor` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE (`user`, `position`)
);

ALTER TABLE `article`
  ADD FOREIGN KEY (`thread`) REFERENCES `thread`(`id`) ON DELETE CASCADE,
  ADD FOREIGN KEY (`user`) REFERENCES `user`(`id`) ON DELETE CASCADE,
  ADD FOREIGN KEY (`parent`) REFERENCES `article`(`id`) ON DELETE CASCADE
;

ALTER TABLE `event`
  ADD FOREIGN KEY (`image`) REFERENCES `image`(`id`) ON DELETE SET NULL
;

ALTER TABLE `following`
  ADD FOREIGN KEY(`from_user`) REFERENCES `user`(`id`) ON DELETE CASCADE,
  ADD FOREIGN KEY(`to_user`) REFERENCES `user`(`id`) ON DELETE CASCADE
;

ALTER TABLE `notification`
  ADD FOREIGN KEY (`user`) REFERENCES `user`(`id`) ON DELETE CASCADE,
  ADD FOREIGN KEY (`article`) REFERENCES `article`(`id`) ON DELETE CASCADE
;

ALTER TABLE `project`
  ADD FOREIGN KEY (`team`) REFERENCES `team`(`id`) ON DELETE CASCADE,
  ADD FOREIGN KEY (`event`) REFERENCES `event`(`id`) ON DELETE SET NULL
;

ALTER TABLE `star`
  ADD FOREIGN KEY (`user`) REFERENCES `user`(`id`) ON DELETE CASCADE,
  ADD FOREIGN KEY (`article`) REFERENCES `article`(`id`) ON DELETE CASCADE
;

ALTER TABLE `task`
  ADD FOREIGN KEY (`work`) REFERENCES `work`(`id`) ON DELETE CASCADE,
  ADD FOREIGN KEY (`progress`) REFERENCES `progress`(`id`) ON DELETE CASCADE
;

ALTER TABLE `thread`
  ADD FOREIGN KEY (`user`) REFERENCES `user`(`id`) ON DELETE CASCADE,
  ADD FOREIGN KEY (`user_team`) REFERENCES `xref_user_team`(`id`) ON DELETE CASCADE,
  ADD FOREIGN KEY (`board`) REFERENCES `board`(`id`) ON DELETE CASCADE,
  ADD FOREIGN KEY (`event`) REFERENCES `event`(`id`) ON DELETE SET NULL
;

ALTER TABLE `user`
  ADD FOREIGN KEY (`image`) REFERENCES `image`(`id`) ON DELETE SET NULL,
  ADD FOREIGN KEY (`blog`) REFERENCES `board`(`id`) ON DELETE SET NULL
;

ALTER TABLE `vote`
  ADD FOREIGN KEY (`user`) REFERENCES `user`(`id`) ON DELETE CASCADE,
  ADD FOREIGN KEY (`article`) REFERENCES `article`(`id`) ON DELETE CASCADE,
  ADD FOREIGN KEY (`vote_type`) REFERENCES `vote_type`(`id`) ON DELETE CASCADE
;

ALTER TABLE `work`
  ADD FOREIGN KEY (`project`) REFERENCES `project`(`id`) ON DELETE CASCADE
;

ALTER TABLE `xref_article_image`
  ADD FOREIGN KEY (`article`) REFERENCES `article`(`id`) ON DELETE CASCADE,
  ADD FOREIGN KEY (`image`) REFERENCES `image`(`id`) ON DELETE CASCADE
;

ALTER TABLE `xref_event_tag`
  ADD FOREIGN KEY (`event`) REFERENCES `event`(`id`) ON DELETE CASCADE,
  ADD FOREIGN KEY (`tag`) REFERENCES `tag`(`id`) ON DELETE CASCADE
;

ALTER TABLE `xref_task_position`
  ADD FOREIGN KEY (`task`) REFERENCES `task`(`id`) ON DELETE CASCADE,
  ADD FOREIGN kEY (`position`) REFERENCES `position`(`id`) ON DELETE CASCADE
;

ALTER TABLE `xref_thread_tag`
  ADD FOREIGN KEY (`thread`) REFERENCES `thread`(`id`) ON DELETE CASCADE,
  ADD FOREIGN KEY (`tag`) REFERENCES `tag`(`id`) ON DELETE CASCADE
;

ALTER TABLE `xref_user_board`
  ADD FOREIGN KEY (`user`) REFERENCES `user`(`id`) ON DELETE CASCADE,
  ADD FOREIGN KEY (`board`) REFERENCES `board`(`id`) ON DELETE CASCADE
  ADD FOREIGN KEY (`role`) REFERENCES `role`(`id`) ON DELETE CASCADE
;

ALTER TABLE `xref_user_task`
  ADD FOREIGN KEY (`user`) REFERENCES `user`(`id`) ON DELETE CASCADE,
  ADD FOREIGN KEY (`task`) REFERENCES `task`(`id`) ON DELETE CASCADE
;

ALTER TABLE `xref_user_team`
  ADD FOREIGN KEY (`team`) REFERENCES `team`(id) ON DELETE CASCADE,
  ADD FOREIGN KEY (`user`) REFERENCES `user`(id) ON DELETE CASCADE
;

ALTER TABLE `xref_user_position`
  ADD FOREIGN KEY (`user`) REFERENCES `user`(`id`) ON DELETE CASCADE,
  ADD FOREIGN KEY (`position`) REFERENCES `position`(`id`) ON DELETE CASCADE
;
