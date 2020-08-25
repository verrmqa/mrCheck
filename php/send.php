<?php

if((isset($_POST['name'])&&$_POST['name']!="")&&(isset($_POST['email'])&&$_POST['email']!="")&&(isset($_POST['phone'])&&$_POST['phone']!="")){ //Проверка отправилось ли наше поля name и не пустые ли они
    $to = 'connect@admr.pro, 9727282@mail.ru'; //Почта получателя, через запятую можно указать сколько угодно адресов
    $subject = 'Обратный звонок с модального окна'; //Загаловок сообщения
    $message = '
            <html>
                <head>
                    <title>Имя '.$_POST['name'].'</title>
                </head>
                <body>
                    <p>Имя '.$_POST['name'].'</p>
                    <p>Имейл: '.$_POST['email'].'</p>
                    <p>Телефон: '.$_POST['phone'].'</p> 
                    <p>Коммент: '.$_POST['comment'].'</p> 
                </body>
            </html>'; //Текст нащего сообщения можно использовать HTML теги
    $headers  = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
    $headers .= "From: Отправитель: сайт франшизы ILkato\r\n"; //Наименование и почта отправителя
     //Отправка письма с помощью функции mail
    $mail_success = mail($to, $subject, $message, $headers);
    if( $mail_success ) {
        echo true; }
        else {
        echo false; }
}
?>