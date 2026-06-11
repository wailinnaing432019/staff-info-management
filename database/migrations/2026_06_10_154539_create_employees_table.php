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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('staff_number')->nullable(); //1
            $table->string('name')->nullable(); //2
            $table->string('nickname')->nullable(); //3
            $table->string('alternative_name')->nullable(); //4
            $table->string('gender')->nullable(); //5
            $table->string('date_of_birth')->nullable(); //6
            $table->integer('age')->nullable(); //7
            $table->string('birth_place')->nullable(); //8
            $table->string('race')->nullable(); //9
            $table->string('religion')->nullable(); //10
            $table->string('nrc')->nullable()->unique(); //11
            $table->string('father_name')->nullable(); //12
            $table->string('father_job')->nullable(); //13
            $table->string('mother_name')->nullable(); //14
            $table->string('marital_status')->nullable(); //15
            $table->string('spouse_name')->nullable(); //16
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
