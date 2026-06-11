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
        Schema::create('employee_employments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->string('position')->nullable(); //17
            $table->string('department')->nullable(); //18

            $table->string('salary_scale')->nullable(); //19
            $table->string('salary_rate')->nullable();  //20

            $table->string('employee_start_date_detail')->nullable();  //21
            $table->string('current_pos_start_date_detail')->nullable();  //22
            $table->string('current_dept_start_date_detail')->nullable(); //23
            $table->text('penalty_detail')->nullable();
            $table->text('contract_agreement_detail')->nullable(); //36
            $table->text('foreign_detail')->nullable();
            $table->text('training_detail')->nullable();
            $table->text('transfer_detail')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_employments');
    }
};
