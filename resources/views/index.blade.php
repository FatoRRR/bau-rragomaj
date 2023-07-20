<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <link rel="shortcut icon" href="#">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{ config('app.name', 'FatoR') }}</title>

        @vite(['resources/js/app.js'])
    </head>
    <body id="app"></body>
</html>
