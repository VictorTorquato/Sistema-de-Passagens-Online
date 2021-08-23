INSERT INTO cidade VALUES ('MG', 'João Monlevade');
INSERT INTO cidade VALUES ('MG', 'Belo Horizonte');
INSERT INTO cidade VALUES ('MG', 'Conselheiro Lafaiete');
INSERT INTO cidade VALUES ('SP', 'São Paulo');
INSERT INTO cidade VALUES ('RJ', 'Rio de Janeiro');
INSERT INTO cidade VALUES ('DF', 'Brasília');
INSERT INTO cidade VALUES ('SP', 'Campinas');
INSERT INTO cidade VALUES ('MG', 'Ipatinga');

INSERT INTO onibus VALUES(ARRAY[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32],'Convencional',' ',32,'TESTE-123');
INSERT INTO onibus VALUES(ARRAY[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32],'Leito',' ',32,'TESTE-321');
INSERT INTO onibus VALUES(ARRAY[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32],'Semi leito',' ',32,'TESTE-231');

INSERT INTO empresa VALUES('Viação Exemplo 1','exemplocontato@gmail.com','31 1234 5678','00.000.000/0001-00',' ','Pass1234', ARRAY[1,3]);
INSERT INTO empresa VALUES('Viação Exemplo 2','exemplo2contato@gmail.com','31 8765 4321','00.000.000/0002-00',' ','Pass4321', ARRAY[2]);

INSERT INTO rota VALUES(1,1,2,205,'02:30:00',1);
INSERT INTO rota VALUES(2,2,1,205,'02:20:00',2);
INSERT INTO rota VALUES(3,3,2,220,'02:30:00',3);
INSERT INTO rota VALUES(4,4,5,800,'09:00:00',1);
INSERT INTO rota VALUES(5,6,7,910,'11:20:00',2);
INSERT INTO rota VALUES(6,2,8,320,'04:30:00',3);

INSERT INTO viagem VALUES(ARRAY[],1,32,'Disponivel',1,'22/08/2021','22:30:00', 45);
INSERT INTO viagem VALUES(ARRAY[],2,32,'Disponivel',2,'23/08/2021','18:30:00', 45);
INSERT INTO viagem VALUES(ARRAY[],3,32,'Disponivel',1,'24/10/2021','14:30:00', 45);
INSERT INTO viagem VALUES(ARRAY[],4,32,'Disponivel',2,'02/09/2021','18:30:00', 120);
INSERT INTO viagem VALUES(ARRAY[],5,32,'Disponivel',1,'29/08/2021','14:30:00', 150);
INSERT INTO viagem VALUES(ARRAY[],6,32,'Disponivel',2,'29/08/2021','18:30:00', 45);

INSERT INTO viagem VALUES(ARRAY[],1,32,'Disponivel',1,'23/08/2021','14:30:00', 45);
INSERT INTO viagem VALUES(ARRAY[],2,32,'Disponivel',2,'24/08/2021','12:30:00', 45);
INSERT INTO viagem VALUES(ARRAY[],3,32,'Disponivel',1,'24/10/2021','17:30:00', 45);
INSERT INTO viagem VALUES(ARRAY[],4,32,'Disponivel',2,'02/09/2021','18:30:00', 120);
INSERT INTO viagem VALUES(ARRAY[],5,32,'Disponivel',1,'29/08/2021','14:30:00', 150);
INSERT INTO viagem VALUES(ARRAY[],6,32,'Disponivel',2,'26/08/2021','18:30:00', 45);
