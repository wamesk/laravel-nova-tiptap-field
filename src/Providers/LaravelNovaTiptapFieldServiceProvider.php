<?php

declare(strict_types = 1);

namespace Wame\LaravelNovaTiptapField\Providers;

use Illuminate\Support\ServiceProvider;
use Laravel\Nova\Events\ServingNova;
use Laravel\Nova\Nova;

class LaravelNovaTiptapFieldServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot(): void
    {
        Nova::serving(function (ServingNova $event): void {
            Nova::script('tiptap', __DIR__ . '/../../dist/js/field.js');
            Nova::style('tiptap', __DIR__ . '/../../dist/css/field.css');
        });
    }
    
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register(): void
    {

    }
}
