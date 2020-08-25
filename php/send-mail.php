<?php
if(isset($_POST['phone'])){
    $to = 'connect@admr.pro, 9727282@mail.ru';
    $subject = 'Обратный звонок';
    $message = '
            <html>
                <body>
                    <p>Телефон: '.$_POST['phone'].'</p>                        
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