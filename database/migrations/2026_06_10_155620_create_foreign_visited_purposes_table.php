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
        Schema::create('foreign_visited_purposes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->string('destination_country');
            $table->string('assigned_country');
            $table->date('time_period')->nullable(); 
            $table->date('arrival_date')->nullable(); 
            $table->string('training_course')->nullable();
            $table->string('supporting_agency')->nullable();
            $table->string('return_department')->nullable(); 
            $table->text('foreign_visit_details')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('foreign_visited_purposes');
    }
};
