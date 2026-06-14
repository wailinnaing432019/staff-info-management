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
        Schema::create('employee_physicals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->string('height')->nullable(); //24
            $table->string('weight')->nullable(); //25
            $table->string('hair_color')->nullable(); //26
            $table->string('eye_color')->nullable(); //27
            $table->string('blood_type')->nullable(); //28
            $table->string('distinctive_mark')->nullable(); //28
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_physicals');
    }
};
