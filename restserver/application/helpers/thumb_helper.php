<?php //if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Thumb()
 * A TimThumb-style function to generate image thumbnails on the fly.
 *
 * @author Darren Craig
 * @author Lozano Hernán <hernantz@gmail.com>
 * @access public
 * @param string $src
 * @param int $width
 * @param int $height
 * @param string $image_thumb
 * @return String
 *
 */

//define("DIRECTORY_SEPARATOR", 'tmb');

function thumb($src, $width, $height, $image_thumb = '') {

    // Get the CodeIgniter super object
    $CI = &get_instance();

    // get src file's dirname, filename and extension
    $path = pathinfo($src);


    // Path to image thumbnail
    if (!file_exists($path['dirname']."/tmb"))
        mkdir($path['dirname'].DIRECTORY_SEPARATOR."tmb");


    //if( !$image_thumb )
        $image_thumb = $path['dirname'] .'/tmb/'. $path['filename'] . "_" . $height . '_' . $width . "." . $path['extension'];

    if ( !file_exists($image_thumb) ) {

        // LOAD LIBRARY
        $CI->load->library('image_lib');

        // CONFIGURE IMAGE LIBRARY
        $config['image_library'] = 'gd';
        $config['source_image'] = $src;
        $config['new_image'] = $image_thumb;
        $config['width'] = $width;
        $config['height'] = $height;
        $config['maintain_ratio'] = false;

        $CI->image_lib->initialize($config);
        $CI->image_lib->resize();
        $CI->image_lib->clear();

       /* // get our image attributes
        list($original_width, $original_height, $file_type, $attr) = getimagesize($image_thumb);

        // set our cropping limits.
        $crop_x = ($original_width / 2) - ($width / 2);
        $crop_y = ($original_height / 2) - ($height / 2);

        // initialize our configuration for cropping
        $config['source_image'] = $image_thumb;
        $config['new_image'] = $image_thumb;
        $config['x_axis'] = $crop_x;
        $config['y_axis'] = $crop_y;


        $CI->image_lib->initialize($config);
        $CI->image_lib->resize();
        $CI->image_lib->clear();*/

    }

    return basename($image_thumb);
}
function thumb2($src, $width,$height, $image_thumb = '') {

    // Get the CodeIgniter super object
    $CI = &get_instance();

    // get src file's dirname, filename and extension
    $path = pathinfo($src);

    // Path to image thumbnail
    if( !$image_thumb )
        $image_thumb =
            $path['dirname'] . DIRECTORY_SEPARATOR .
            $path['filename'] . "_" . $height . '_' . $width . "." . $path['extension'];

    if ( !file_exists($image_thumb) ) {

        // LOAD LIBRARY
        $CI->load->library('image_lib');

        // CONFIGURE IMAGE LIBRARY
        $config = array();

        $config['source_image'] = $src;
        $config['new_image'] = $image_thumb;
        $config['width'] = $width;
        $config['maintain_ratio'] = true;

        $CI->image_lib->initialize($config);
        $CI->image_lib->resize();
        $CI->image_lib->clear();


        // get our image attributes
        list($original_width, $original_height, $file_type, $attr) = getimagesize($image_thumb);

        // set our cropping limits.
        $crop_x = ($original_width / 2) - ($width / 2);
        $crop_y = ($original_height / 2) - ($height / 2);

        unset($config);
        $config = array();
        // initialize our configuration for cropping
        $config['source_image'] = $image_thumb;
        $config['new_image'] = $image_thumb;
        $config['x_axis'] = $crop_x;
        $config['y_axis'] = $crop_y;


        $CI->image_lib->initialize($config);
        $CI->image_lib->crop();
        $CI->image_lib->clear();

    }

    return basename($image_thumb);
}


function thumb3($src, $width, $height, $image_thumb = '') {

    if(($src!='')and(file_exists($_SERVER['DOCUMENT_ROOT'].$src))){
        // Get the CodeIgniter super object
        $CI = &get_instance();

        // get src file's dirname, filename and extension

        $path = pathinfo($src);

        // Path to image thumbnail
        if (!file_exists($_SERVER['DOCUMENT_ROOT'].$path['dirname']."/tmb"))
            mkdir($_SERVER['DOCUMENT_ROOT'].$path['dirname'].DIRECTORY_SEPARATOR."tmb");


        //if( !$image_thumb )
        $image_thumb =
            $_SERVER['DOCUMENT_ROOT'].
            $path['dirname'] .'/tmb/'.
            $path['filename'] . "_" . $height . '_' . $width . "." . $path['extension'];

        if ( !file_exists($image_thumb) ) {

            // LOAD LIBRARY
            $CI->load->library('image_lib');

            // CONFIGURE IMAGE LIBRARY
            $config['image_library'] = 'gd2';
            $config['source_image'] = $_SERVER['DOCUMENT_ROOT'].$src;
            $config['new_image'] = $image_thumb;
            $config['width'] = $width;
            $config['height'] = $height;
            $config['maintain_ratio'] = false;


            $CI->image_lib->initialize($config);
            $CI->image_lib->resize();
            $CI->image_lib->clear();



            /* // get our image attributes
             list($original_width, $original_height, $file_type, $attr) = getimagesize($image_thumb);

             // set our cropping limits.
             $crop_x = ($original_width / 2) - ($width / 2);
             $crop_y = ($original_height / 2) - ($height / 2);

             // initialize our configuration for cropping
             $config['source_image'] = $image_thumb;
             $config['new_image'] = $image_thumb;
             $config['x_axis'] = $crop_x;
             $config['y_axis'] = $crop_y;


             $CI->image_lib->initialize($config);
             $CI->image_lib->resize();
             $CI->image_lib->clear();*/

        }

        return $path['dirname'] .'/tmb/'.basename($image_thumb);
    } else return $src;

}

 function resize_image($source_filename, $destination_filename, $new_width, $new_height, $save_geometry = true, $quality = 90) {
    // create image
    $img = imagecreatefromstring(file_get_contents($source_filename));
    $type = strtolower(substr($source_filename, strrpos($source_filename, '.') + 1));
    // original sizes
    $width = imageSX($img);
    $height = imageSY($img);
    // otput parameters
    $target_ratio = $new_width / $new_height;
    $img_ratio = $width / $height;
    // if we save geometry or image is eq to template
    if ($save_geometry || ($width == $new_width && $height == $new_height)) {
        // calculate new sizes
        if ($target_ratio > $img_ratio) {
            $new_height = $new_height;
            $new_width = $img_ratio * $new_height;
        } else {
            $new_height = $new_width / $img_ratio;
            $new_width = $new_width;
        }
        
        if ($new_height > $new_height) {
            $new_height = $new_height;
        }
        if ($new_width > $new_width) {
            $new_height = $new_width;
        }
        $new_width = $new_width;
        $new_height = $new_height;
        // if image is smaller than tpl
        if ($width < $new_width && $height < $new_height) {
            $new_height = $new_height = $height;
            $new_width = $new_width = $width;
        }
    } else {
        // if we dont save pic's geometry (cut it)
        $new_width = $new_width;
        $new_height = $new_height;
        if ($img_ratio > $target_ratio) {
            $cutKoef = $img_ratio / $target_ratio;
            $src_w = intval($width / $cutKoef);
            $src_h = $height;
            $dh = 0;
            $dw = intval($width - $src_w) / 2;
        } else {
            $cutKoef = $target_ratio / $img_ratio;
            $src_h = intval($height / $cutKoef);
            $src_w = $width;
            $dw = 0;
            $dh = intval($height - $src_h) / 4;
        }
    }
    $new_img = imagecreatetruecolor($new_width, $new_height);
    // Turn off alpha blending and set alpha flag
    imagealphablending($new_img, false);
    imagesavealpha($new_img, true);
    // bg color
    $background = array(255, 255, 255);
    if ($save_geometry || ($width == $new_width && $height == $new_height)) {
        imagefilledrectangle($new_img, 0, 0, $new_width - 1, $new_height - 1, imagecolorallocate($new_img, $background[0], $background[1], $background[2]));
        imagecopyresampled($new_img, $img, ($new_width - $new_width) / 2, ($new_height - $new_height) / 2, 0, 0, $new_width, $new_height, $width, $height);
    } else {
        imagecopyresampled($new_img, $img, 0, 0, $dw, $dh, $new_width, $new_height, $src_w, $src_h);
    }
    switch ($type) {
        case "jpg":
        case "jpeg":
            $quality = ($quality) ? $quality : 75;
            return imagejpeg($new_img, $destination_filename, $quality);
            break;
            
        case "png":
            $quality = ($quality) ? round(10 - $quality / 10) : 0;
            return imagepng($new_img, $destination_filename, $quality, PNG_NO_FILTER);
            break;
            
        case "gif":
            return imagegif($new_img, $destination_filename);
            break;
    }
    return false;
}

/* End of file thumb_helper.php */
/* Location: ./application/helpers/thumb_helper.php */

