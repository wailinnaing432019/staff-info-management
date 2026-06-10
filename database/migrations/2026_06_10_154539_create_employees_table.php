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

            $table->string('staff_number')->nullable();

            $table->string('name');
            $table->string('nickname')->nullable();
            $table->string('alternative_name')->nullable();

            $table->string('gender')->nullable();

            $table->date('date_of_birth')->nullable();
            $table->integer('age')->nullable();

            $table->string('birth_place')->nullable();

            $table->string('race')->nullable();
            $table->string('religion')->nullable();

            $table->string('nrc')->nullable()->unique();

            $table->decimal('height', 5, 2)->nullable();
            $table->decimal('weight', 5, 2)->nullable();

            $table->string('hair_color')->nullable();
            $table->string('eye_color')->nullable();

            $table->text('distinctive_mark')->nullable();

            $table->string('father_name')->nullable();
            $table->string('father_job')->nullable();

            $table->string('mother_name')->nullable();

            $table->string('marital_status')->nullable();
            $table->string('spouse_name')->nullable();

            $table->string('blood_type')->nullable();

            $table->string('degree')->nullable();

            $table->string('position')->nullable();
            $table->string('department')->nullable();

            $table->string('salary_scale')->nullable();
            $table->string('salary_rate')->nullable();  

            $table->string('employee_start_date_detail')->nullable();  
            $table->string('current_pos_start_date_detail')->nullable();  
            $table->string('current_dept_start_date_detail')->nullable();
            $table->string('childrens')->nullable();  

            $table->text('current_address')->nullable();
            $table->text('permanent_address')->nullable();

            $table->text('penalty_detail')->nullable();
            $table->text('contract_agreement_detail')->nullable();
            $table->text('foreign_detail')->nullable();
            $table->text('training_detail')->nullable();
            $table->text('transfer_detail')->nullable();

            $table->string('assignment_type')->nullable();
            $table->string('current_training')->nullable();

            $table->boolean('is_accompanied')->default(false);

            $table->text('separation_date')->nullable();
$table->text('remark')->nullable();
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
