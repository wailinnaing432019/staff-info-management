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
        Schema::create('employee_past_jobs', function (Blueprint $table) {
           $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            
            $table->string('prev_position')->nullable();     
            $table->string('prev_dept')->nullable();   
            $table->string('prev_location')->nullable();    
            $table->string('prev_rank')->nullable();    
            $table->enum('type',['normal','high']);    
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_past_jobs');
    }
};
