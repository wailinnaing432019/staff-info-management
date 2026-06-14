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
        Schema::create('employee_infos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->string('degree')->nullable();    //        
            $table->string('childrens')->nullable();  //29
            $table->string('current_address')->nullable(); //30
            $table->string('permanent_address')->nullable(); //31 
            $table->string('email')->nullable(); 
            $table->string('image_path')->nullable(); 
            $table->string('mobile_phno')->nullable(); 

            $table->string('assignment_type')->nullable(); //32
            $table->string('current_training')->nullable();
            $table->string('is_accompanied')->nullable(); //33
            $table->string('not_border')->nullable(); //33
            $table->string('separation_date')->nullable(); //34
            $table->string('remark')->nullable(); //35
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_infos');
    }
};
