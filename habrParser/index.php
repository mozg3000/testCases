<?php
//session_start();
/*
spl_autoload_register(function ($class_name) {
	//echo $class_name; die();
    include $class_name . '.php';
});
*/
require_once './vendor/autoload.php';

use app\lib\parser\HabrPostParser;
//use app\testcase1\lib\parser\HabrPostsDAO;
use app\lib\parser\HabrPostsDAO;
//spl_autoload_register();
$p = [];
$postsUrl = 'https://habr.com/ru/all/';
$postUrlsParser =  '/href=\"(\S+)#habracut/iuU';
$postTitleParser = '/<span class="post__title-text">([\W\S]*)<\/span>/iuU';
$postBodyParser = '/id="post-content-body".+\d{6}\/">\s*([\W\S]*)<\/div>[\s]*<script/iuU';

$habrPostDAO = new HabrPostsDAO();

$habrPostsParser = new HabrPostParser($postsUrl, $postUrlsParser, $postTitleParser, $postBodyParser, $habrPostDAO);

$posts = $habrPostsParser->parsePosts();

?>

<pre>
    <?=print_r($posts)?>
</pre>
