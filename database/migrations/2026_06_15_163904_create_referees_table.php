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
        Schema::create('referees', function (Blueprint $table) {
            $table->id();
 
    $table->foreignId('employee_id')->constrained()->onDelete('cascade');

 
    $table->string('referee_name')->nullable();
    $table->string('referee_position')->nullable();
    $table->string('referee_department')->nullable();

 
    $table->string('rector_name')->nullable();
    $table->string('rector_position')->nullable();
    $table->string('rector_department')->nullable();

 
    $table->string('dept_head_name')->nullable();
    $table->string('dept_head_position')->nullable();
    $table->string('dept_head_department')->nullable(); // (dept အစား department ဟု အပြည့်အစုံရေးတာ ပိုကောင်းပါတယ်)

    $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('referees');
    }
};
