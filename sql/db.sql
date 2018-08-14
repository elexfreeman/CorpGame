-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               5.7.23-0ubuntu0.16.04.1 - (Ubuntu)
-- Операционная система:         Linux
-- HeidiSQL Версия:              9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Дамп структуры для таблица bergame2.afisha
DROP TABLE IF EXISTS `afisha`;
CREATE TABLE IF NOT EXISTS `afisha` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `i_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `afisha` text,
  `title` text,
  `user_id` int(11) DEFAULT NULL,
  `published` int(11) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `published` (`published`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица bergame2.company
DROP TABLE IF EXISTS `company`;
CREATE TABLE IF NOT EXISTS `company` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `caption` text,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица bergame2.company_values
DROP TABLE IF EXISTS `company_values`;
CREATE TABLE IF NOT EXISTS `company_values` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `caption` text,
  `description` text,
  `deleted` int(11) DEFAULT '0',
  `img` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица bergame2.global_rules
DROP TABLE IF EXISTS `global_rules`;
CREATE TABLE IF NOT EXISTS `global_rules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goal` double NOT NULL,
  `balance` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `published` bit(1) NOT NULL DEFAULT b'1',
  `author` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `author` (`author`),
  CONSTRAINT `global_rules_ibfk_1` FOREIGN KEY (`author`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица bergame2.goals
DROP TABLE IF EXISTS `goals`;
CREATE TABLE IF NOT EXISTS `goals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` int(11) DEFAULT NULL,
  `date_create` datetime DEFAULT NULL,
  `caption` text,
  `description` text,
  `price` int(11) DEFAULT NULL,
  `goal` int(11) DEFAULT NULL,
  `active` int(11) DEFAULT NULL,
  `deleted` int(11) DEFAULT '0',
  `round_id` int(11) DEFAULT '0',
  `user_level_caption` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица bergame2.groups
DROP TABLE IF EXISTS `groups`;
CREATE TABLE IF NOT EXISTS `groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `caption` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица bergame2.levels
DROP TABLE IF EXISTS `levels`;
CREATE TABLE IF NOT EXISTS `levels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text CHARACTER SET utf8 NOT NULL,
  `priority` int(11) NOT NULL,
  `goal` int(11) NOT NULL,
  `resp` int(11) NOT NULL,
  `author` int(11) DEFAULT NULL,
  `published` bit(1) NOT NULL DEFAULT b'1',
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `author` (`author`),
  CONSTRAINT `levels_ibfk_1` FOREIGN KEY (`author`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

-- Экспортируемые данные не выделены.
-- Дамп структуры для функция bergame2.lieks_count
DROP FUNCTION IF EXISTS `lieks_count`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` FUNCTION `lieks_count`(like_id INT) RETURNS int(11)
BEGIN
DECLARE lk_t FLOAT DEFAULT 0;

select COUNT(*) INTO lk_t from (
SELECT *
FROM likes ll
WHERE ll.parent=like_id group by ll.author
) d;


RETURN lk_t;
END//
DELIMITER ;

-- Дамп структуры для таблица bergame2.likegroup
DROP TABLE IF EXISTS `likegroup`;
CREATE TABLE IF NOT EXISTS `likegroup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица bergame2.likes
DROP TABLE IF EXISTS `likes`;
CREATE TABLE IF NOT EXISTS `likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text,
  `i_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `rule` int(11) DEFAULT NULL,
  `parent` int(11) DEFAULT NULL,
  `author` int(11) DEFAULT NULL,
  `user_whom` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `author` (`author`),
  KEY `parent` (`parent`),
  KEY `user_whom` (`user_whom`),
  KEY `rule` (`rule`)
) ENGINE=InnoDB AUTO_INCREMENT=2668 DEFAULT CHARSET=utf8;

-- Экспортируемые данные не выделены.
-- Дамп структуры для функция bergame2.likes_count
DROP FUNCTION IF EXISTS `likes_count`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` FUNCTION `likes_count`(
	`like_id` INT,
	`u_author` INT,
	`u_user_whom` INT






) RETURNS int(11)
BEGIN
DECLARE lk_t FLOAT DEFAULT 0;

select COUNT(*) INTO lk_t from (
	SELECT ll.id
	FROM likes ll
	WHERE 
	(ll.parent=like_id)
 	and(ll.author<>u_author)

	
	 group by ll.author
) d;


RETURN lk_t;
END//
DELIMITER ;

-- Дамп структуры для таблица bergame2.like_images
DROP TABLE IF EXISTS `like_images`;
CREATE TABLE IF NOT EXISTS `like_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `like_id` int(11) DEFAULT NULL,
  `i_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `img` text,
  PRIMARY KEY (`id`),
  KEY `like_id` (`like_id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица bergame2.like_rules
DROP TABLE IF EXISTS `like_rules`;
CREATE TABLE IF NOT EXISTS `like_rules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `caption` text,
  `coef` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица bergame2.machines
DROP TABLE IF EXISTS `machines`;
CREATE TABLE IF NOT EXISTS `machines` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT 'new mach',
  `sold` text,
  `user_id` int(11) DEFAULT NULL,
  `gate_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `ip` text,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=16956 DEFAULT CHARSET=utf8;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица bergame2.news
DROP TABLE IF EXISTS `news`;
CREATE TABLE IF NOT EXISTS `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text,
  `news` text,
  `i_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `published` int(11) DEFAULT '1',
  `user_id` int(11) DEFAULT NULL,
  `deleted` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `published` (`published`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица bergame2.news_images
DROP TABLE IF EXISTS `news_images`;
CREATE TABLE IF NOT EXISTS `news_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `img` text,
  `news_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `news_id` (`news_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица bergame2.posts
DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `author` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `whom` int(11) NOT NULL,
  `text` text NOT NULL,
  `category` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `author` (`author`),
  KEY `whom` (`whom`),
  KEY `category` (`category`),
  CONSTRAINT `post_author` FOREIGN KEY (`author`) REFERENCES `users` (`id`),
  CONSTRAINT `post_category` FOREIGN KEY (`category`) REFERENCES `likegroup` (`id`),
  CONSTRAINT `post_whom` FOREIGN KEY (`whom`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1442 DEFAULT CHARSET=utf8;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица bergame2.rounds
DROP TABLE IF EXISTS `rounds`;
CREATE TABLE IF NOT EXISTS `rounds` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `i_date` date DEFAULT NULL,
  `caption` text,
  `description` text,
  `status` int(11) DEFAULT NULL,
  `deleted` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица bergame2.rules
DROP TABLE IF EXISTS `rules`;
CREATE TABLE IF NOT EXISTS `rules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL DEFAULT '0',
  `text` text NOT NULL,
  `author` int(11) DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `published` bit(1) DEFAULT b'0',
  `coef` double NOT NULL DEFAULT '0.8',
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  KEY `author` (`author`),
  CONSTRAINT `author` FOREIGN KEY (`author`) REFERENCES `users` (`id`),
  CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `likegroup` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица bergame2.ship_class
DROP TABLE IF EXISTS `ship_class`;
CREATE TABLE IF NOT EXISTS `ship_class` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `caption` text COLLATE utf8_bin,
  `color` text COLLATE utf8_bin,
  `ico` text COLLATE utf8_bin,
  `ico_w` text COLLATE utf8_bin,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица bergame2.start_date
DROP TABLE IF EXISTS `start_date`;
CREATE TABLE IF NOT EXISTS `start_date` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица bergame2.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `start_score` int(11) NOT NULL DEFAULT '0',
  `start_do_likes` int(11) NOT NULL DEFAULT '0',
  `photoUrl` text,
  `login` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `date_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `hash` text,
  `group` tinyint(4) DEFAULT '1',
  `level` int(11) DEFAULT NULL,
  `email` text NOT NULL,
  `game_over` int(11) NOT NULL,
  `apikey` text,
  `surname` text,
  `about` text,
  `phone` text,
  `city` text,
  `education` text,
  `instagram` text,
  `vk` text,
  `hobby` text,
  `book` text,
  `question` text,
  `sex` int(11) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `level` (`level`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;

-- Экспортируемые данные не выделены.
-- Дамп структуры для функция bergame2.user_do_comments
DROP FUNCTION IF EXISTS `user_do_comments`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` FUNCTION `user_do_comments`(
	`like_id` INT,
	`author` INT
) RETURNS int(11)
BEGIN
	DECLARE result INT DEFAULT 0;
	
	select COUNT(*) INTO result from (
			SELECT ll.id
			FROM likes ll
			WHERE 
			(ll.parent=like_id)
			and
			(ll.author=author)
			
			limit 1
	) d;	
	
	RETURN result;
END//
DELIMITER ;

-- Дамп структуры для функция bergame2.user_do_likes
DROP FUNCTION IF EXISTS `user_do_likes`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` FUNCTION `user_do_likes`(
	`author_p` INT




) RETURNS int(11)
BEGIN

	DECLARE result int DEFAULT 0;

		select score INTO result from (
		
		select sum(coef) score, author  from (
		
		
		select * from
		(select 
			l.* ,lr.coef
		from likes l
		join likes l_root
		on 
		((l_root.id=l.parent)and(l_root.author<>l.author))
		
		  JOIN like_rules lr ON lr.id=l.rule
		  
		where 
		(l.parent>0)
		
		group by l.author) a
		
		union
		
		select * from 
		(
		  SELECT l.*, lr.coef
		      FROM likes l
		      JOIN like_rules lr ON lr.id=l.rule
		      where 
				(l.parent=0)
				and(l.author<>l.user_whom)
		    
		)b
		
		) d
		group by author
	
		
		having author=author_p limit 1
		) ww;
		
		RETURN result;
END//
DELIMITER ;

-- Дамп структуры для функция bergame2.user_score
DROP FUNCTION IF EXISTS `user_score`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` FUNCTION `user_score`(
	`user_id` INT



) RETURNS int(11)
BEGIN DECLARE result INT DEFAULT 0;
	SELECT 
	SUM((likes_count(l.id, l.author, l.user_whom)+(l.author<>l.user_whom))*lr.coef)+u.start_score
	
	INTO result
	FROM likes l
	JOIN like_rules lr ON lr.id=l.rule
	
	join users u
	on u.id=user_id
	WHERE 
		(l.user_whom=user_id) AND(l.parent=0); 
	
	RETURN result;
END//
DELIMITER ;

-- Дамп структуры для таблица bergame2.wishes
DROP TABLE IF EXISTS `wishes`;
CREATE TABLE IF NOT EXISTS `wishes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `i_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `wish` text,
  `user_id` int(11) DEFAULT NULL,
  `publish` int(11) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- Экспортируемые данные не выделены.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
