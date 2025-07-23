<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('traffic_analytics', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->integer('views')->default(0);
            $table->integer('unique_visitors')->default(0);
            $table->timestamps();
            
            $table->unique('date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('traffic_analytics');
    }
};
