<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployeeDetail extends Model
{
    protected $fillable = [
        'employee_id',
        'skin_color', 'previous_address', 'father_address_detail', 
        'mother_address_detail', 'is_parent_season_at_birth', 'reason_for_current_occupation', 'selection_type',
        'previous_school', 'last_school', 'student_level', 'hobby', 
        'referee_status', 'reason_for_transfer', 'service_rank', 'close_friend', 
        'close_foreign_friend', 'supporter', 'crime_victim_status','is_party_member','employment_reference'
    ];
}
