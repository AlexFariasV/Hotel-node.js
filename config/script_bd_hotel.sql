

DROP TABLE IF EXISTS `tipo_quartos`;

CREATE TABLE `tipo_quartos` (
  `id_quartos` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(20) NOT NULL,
  `descricao` text NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  `imagem1` varchar(60) NOT NULL,
  `imagem2` varchar(60) NOT NULL,
  `imagem3` varchar(60) NOT NULL,
  `status_quarto` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_quartos`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `tipo_quartos` WRITE;

INSERT INTO `tipo_quartos` VALUES (1,'Quarto Luxo','Espaçoso e confortável quarto de hotel, equipado com cama king-size, TV de tela plana, minibar, ar-condicionado e banheiro privativo.',300.00,'imagem/quartos/quarto_1.png','imagem/quartos/quarto_2.png','imagem/quartos/quarto_3.png',1),(2,'Quarto Standard','O quarto Standard oferece um ambiente aconchegante e confortável para os hóspedes que procuram uma estadia relaxante e acessível.Equipado com uma cama confortável, área de trabalho funcional, televisão de tela plana e banheiro privativo, o Quarto Standard proporciona uma atmosfera acolhedora para uma estadia agradável. ',189.99,'imagem/quartos/quarto_4.png','imagem/quartos/quarto_5.png','imagem/quartos/quarto_6.png',1),(3,'Suíte Executiva','A Suíte Executiva é projetada para atender às necessidades dos viajantes de negócios e hóspedes exigentes que procuram um ambiente luxuoso e funcional.A suíte dispõe de uma área de estar separada, ideal para reuniões informais ou relaxamento, além de uma espaçosa área de trabalho equipada com acesso à internet de alta velocidade. ',300.00,'imagem/quartos/quarto_7.png','imagem/quartos/quarto_8.png','imagem/quartos/quarto_9.png',1),(4,'Suíte Presidencial','A Suíte Presidencial é a epítome do luxo e exclusividade, projetada para satisfazer os mais altos padrões de conforto e estilo. A suíte inclui uma área de estar extravagante, completa com uma lareira elegante e uma vista deslumbrante da cidade. O quarto principal apresenta uma cama king-size com lençóis de alta qualidade, enquanto o banheiro privativo é um verdadeiro santuário, com uma banheira de hidromassagem, chuveiro de efeito chuva e produtos de banho premium. ',499.99,'imagem/quartos/quarto_10.png','imagem/quartos/quarto_11.png','imagem/quartos/quarto_12.png',1);

UNLOCK TABLES;

DROP TABLE IF EXISTS `tipo_usuario`;
CREATE TABLE `tipo_usuario` (
  `id_tipo_usuario` int NOT NULL AUTO_INCREMENT,
  `tipo_usuario` varchar(25) DEFAULT NULL,
  `descricao_usuario` varchar(155) DEFAULT NULL,
  `status_tipo_usuario` int DEFAULT '1',
  PRIMARY KEY (`id_tipo_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `tipo_usuario` WRITE;
INSERT INTO `tipo_usuario` VALUES (1,'Comum','Usuário cadastrado no sistema',1),(2,'Encarregado','Usuário com acesso a consultas na área administrativa',1),(3,'ADM','Usuário com acesso a consultas e edições na área administrativa',1);

UNLOCK TABLES;

DROP TABLE IF EXISTS `usuario`;

CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nome_usuario` varchar(45) DEFAULT NULL,
  `user_usuario` varchar(45) DEFAULT NULL,
  `senha_usuario` char(60) DEFAULT NULL,
  `email_usuario` varchar(45) DEFAULT NULL,
  `cpf_usuario` CHAR(14) NOT NULL,
  `fone_usuario` varchar(11) DEFAULT NULL,
  `tipo_usuario` int NOT NULL DEFAULT '1',
  `status_usuario` int DEFAULT '1',
  PRIMARY KEY (`id_usuario`),
  KEY `fk_usuario_tipo_usuario_idx` (`tipo_usuario`),
  CONSTRAINT `fk_usuario_tipo_usuario` FOREIGN KEY (`tipo_usuario`) REFERENCES `tipo_usuario` (`id_tipo_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


LOCK TABLES `usuario` WRITE;

INSERT INTO `usuario` VALUES (1,'Helvética','helvinha','$2a$12$J1piFIoOATeGAlIOPW0HSuo.pWb/tBJabaoyNNMkxwgrLAG70MYFK','helvinh@gmail.com','493.807.920-85','11941549878',3,1);
INSERT INTO `usuario` VALUES (2,'Cliente1','cliente','$2a$12$J1piFIoOATeGAlIOPW0HSuo.pWb/tBJabaoyNNMkxwgrLAG70MYFK','teste@teste.com','493.807.920-85','11941549878',1,1);
INSERT INTO `usuario` VALUES (3,'Cliente2','cliente','$2a$12$J1piFIoOATeGAlIOPW0HSuo.pWb/tBJabaoyNNMkxwgrLAG70MYFK','teste1@teste.com','493.807.920-85','11941549878',1,1);
INSERT INTO `usuario` VALUES (4,'Cliente3','cliente','$2a$12$J1piFIoOATeGAlIOPW0HSuo.pWb/tBJabaoyNNMkxwgrLAG70MYFK','teste1@teste.com','493.807.920-85','11941549878',1,1);

UNLOCK TABLES;
