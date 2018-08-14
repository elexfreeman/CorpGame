<?php
require_once 'application/helpers/thumb_helper.php';
include 'image_templates.php';
//echo "ddd"; exit;
//$_GET['file'] = preg_replace('/[^\w\._]+/', '', $_GET['file']);
if (!substr_count($_GET['template'], "bergth_")) $_GET['template']="";
$_GET['full_path'] = str_replace($_GET['template'],"",$_GET['full_path']);
$template_name = str_replace(array("bergth_","/"),array("",""),$_GET['template']);

$original_image = $_SERVER['DOCUMENT_ROOT'] . "/img/".$_GET['full_path'].$_GET['file'];
//print_r($original_image);
if (file_exists($original_image)) {
    if (!empty($_GET['template'])) {
        $destination_image = $_SERVER['DOCUMENT_ROOT'] . "/img/{$_GET['full_path']}".$_GET['template'].$_GET['file'];
 
        if (!file_exists($destination_image)) {
            if (!empty($templates[$template_name])) {
                $template = $templates[$template_name];
                // search for the template's folder
                $thumb_folder = "img/".$_GET['full_path'].$_GET['template'];
                if (!file_exists($thumb_folder)) {
                    mkdir($thumb_folder, 0777);
                }
               // print_r($original_image);
                //exit;
                if (resize_image($original_image, $destination_image, $template['width'], $template['height'], $template['proportional'], $template['quality'])) {
                    flush_image($destination_image);
                }
            }
        } else {
            flush_image($destination_image);
        }
    } else {
        flush_image($original_image);
    }
}

function flush_image($filename) {
    // send image-type headers

    $ext = substr($filename, strrpos($filename, '.') + 1);
    $mime = ($ext == 'jpg') ? 'jpeg' : $ext;
    header("Content-type: image/{$mime}");
    $handle = fopen($filename, "r");
    while (!feof($handle)) {
        print fread($handle, 1024);
    }
    fclose($handle);
}

?>
