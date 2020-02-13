<?php


namespace app\folder;


class HabrPostsDAO
{

    /**
     * HabrPostsDAO constructor.
     */
    public function __construct()
    {
    }

    public function getRawData(string $postUrl):string
    {
        return file_get_contents($postUrl);
    }
}