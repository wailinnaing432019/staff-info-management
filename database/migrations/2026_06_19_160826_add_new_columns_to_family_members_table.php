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
        Schema::table('family_members', function (Blueprint $table) {
            $table->string('race_and_religion')->nullable();
            $table->string('native_town')->nullable();
            $table->string('arrived_country')->nullable();
            $table->string('arrived_purpose')->nullable();
            $table->string('return_period')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('family_members', function (Blueprint $table) {
            $table->dropColumn([
                'race_and_religion',
                'native_town',
                'arrived_country',
                'arrived_purpose',
                'return_period'
            ]);
        });
    }
};
