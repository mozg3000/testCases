<?php
$data = file_get_contents('https://habr.com/ru/all/');
$start = [];
$end = [];
$post_urls = [];
$posts = [];
preg_match_all('/href=\"(\S+)#habracut/iu', $data, $post_urls);
$post_urls = array_splice($post_urls[1], 0, 5);
foreach ($post_urls as $post_url){
    $data = file_get_contents($post_url);
    $post_body = [];
    $post_title = [];

    preg_match('/id="post-content-body".+\d{6}\/">\s*([\W\S]*)<\/div>[\s]*<script/iuU', $data, $post_body,PREG_OFFSET_CAPTURE);
    preg_match('/<span class="post__title-text">([\w\s]*)<\/span>/iuU', $data, $post_title,PREG_OFFSET_CAPTURE);
    $posts[] = [
            'url' => $post_url,
            'title' => $post_title[1][0],
            'body' => $post_body[1][0]
    ];
}
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
     <pre>
<!--          --><?php //foreach ($posts as $post):?>
<!---->
<!--              --><?//var_dump($post)?>
<!--         --><?php //endforeach;?>
         <?=var_dump($posts)?>
<!--         --><?//=var_dump($post_url)?>
<!--         --><?//=var_dump($post_body)?>
<!--         --><?//=var_dump($post_title)?>

         <?=print_r($posts[0]['body'])?>
</pre>




</body>
</html>
