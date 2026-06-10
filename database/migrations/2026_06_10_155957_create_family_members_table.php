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
        Schema::create('family_members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->string('relation_name');
    $table->string('gender')->nullable();
    $table->string('nationality')->nullable();
    $table->string('occupation')->nullable();
    $table->text('address')->nullable();
    $table->text('remark')->nullable();
    $table->enum('relationship_type', ['father_sibling','mother_sibling','employee_sibling', 'spouse_family','spouse_father_family','spouse_mother_family','children','relative_abroad']); 
    $table->string('family_lineage')->nullable();  
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('family_members');
    }
};
