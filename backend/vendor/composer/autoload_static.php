<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit6ccef091e8fbdaa80ba1fdf27a220d4f
{
    public static $prefixLengthsPsr4 = array (
        'R' => 
        array (
            'Rakit\\Validation\\' => 17,
        ),
        'D' => 
        array (
            'Dcblogdev\\PdoWrapper\\' => 21,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Rakit\\Validation\\' => 
        array (
            0 => __DIR__ . '/..' . '/rakit/validation/src',
        ),
        'Dcblogdev\\PdoWrapper\\' => 
        array (
            0 => __DIR__ . '/..' . '/dcblogdev/pdo-wrapper/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit6ccef091e8fbdaa80ba1fdf27a220d4f::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit6ccef091e8fbdaa80ba1fdf27a220d4f::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit6ccef091e8fbdaa80ba1fdf27a220d4f::$classMap;

        }, null, ClassLoader::class);
    }
}
