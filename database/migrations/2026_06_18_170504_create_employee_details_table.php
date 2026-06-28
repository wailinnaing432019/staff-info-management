<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('employee_details', function (Blueprint $table) {
            $table->id(); 
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
             
            $table->string('skin_color')->nullable();                    // 10. skinColor
 
            $table->text('previous_address')->nullable();                // 16. previousAddress
            $table->text('father_address_detail')->nullable();           // 19. fatherAddressDetail
            $table->text('mother_address_detail')->nullable();           // 20. motherAddressDetail
            $table->string('is_parent_season_at_birth')->nullable();     // 21. isParentSeasonAtBirth
            $table->text('reason_for_current_occupation')->nullable();  // 22. reasonForCurrentOccupation
            $table->string('selection_type')->nullable();                // 27. selectionType
 
            $table->text('previous_school')->nullable();                 // 1. previousSchool
            $table->text('last_school')->nullable();                     // 2. lastSchool
            $table->text('student_level')->nullable();                   // 3. studentLevel
            $table->text('hobby')->nullable();                           // 4. hobby
            $table->text('referee_status')->nullable();                  // 5. refugeeStatus
            $table->text('reason_for_transfer')->nullable();             // 6. reasonForTransfer
            $table->text('service_rank')->nullable();                    // 7. serviceRank
            $table->text('close_friend')->nullable();                    // 8. closeFriend
            $table->text('close_foreign_friend')->nullable();            // 9. closeForeignFriend
            $table->text('supporter')->nullable();                       // 10. supporter
            $table->text('crime_victim_status')->nullable();             // 11. crimeVictimStatus
            $table->text('is_party_member')->nullable();
            $table->text('employment_reference')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('employee_details');
    }
};