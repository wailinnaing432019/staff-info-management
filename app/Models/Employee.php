<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $fillable = [
        'staff_number',
        'name',
        'nickname',
        'alternative_name',
        'gender',
        'date_of_birth',
        'age',
        'date_of_birth_detail',
        'birth_place',
        'race',
        'religion',
        'nrc_state',
        'nrc_type',
        'nrc_township',
        'nrc_number',
        'father_name',
        'father_job',
        'mother_name',
        'marital_status',
        'spouse_name', 
    ];



    public function physical()
    {
        return $this->hasOne(EmployeePhysical::class);
    }
    public function info()
    {
        return $this->hasOne(EmployeeInfo::class);
    }
    public function employment()
    {
        return $this->hasOne(EmployeeEmployment::class);
    }
    public function foreignVisitedPurpose()
    {
        return $this->hasOne(ForeignVisitedPurpose::class);
    }
    public function referee()
    {
        return $this->hasOne(Referee::class);
    }
    public function educations()
    {
        return $this->hasMany(Education::class);
    }
    public function serviceRecords()
    {
        return $this->hasMany(ServiceRecord::class);
    }
    public function familyMembers()
    {
        return $this->hasMany(FamilyMember::class);
    }
    public function abroadVisits()
    {
        return $this->hasMany(AbroadVisit::class);
    }

    public function awardsReceived()
    {
        return $this->hasMany(AwardReceived::class);
    }
    public function courtDisciplinaryActions()
    {
        return $this->hasMany(CourtDisciplinaryAction::class);
    }
    public function criminalRecords()
    {
        return $this->hasMany(CriminalRecord::class);
    }
    public function trainings()
    {
        return $this->hasMany(Training::class);
    }
}
