<?php

namespace App\Repositories\Eloquent;

use App\Models\Employee;
use App\Repositories\Contracts\EmployeeRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EmployeeRepository implements EmployeeRepositoryInterface
{
 
    public function paginateWithFilters(Request $request)
    {
        $search = $request->input('search');

        return Employee::query()
            ->with(['info' => function ($query) {
                $query->select('id', 'employee_id', 'image_path');
            }])
            ->with(['employment' => function ($query) {
                $query->select('id', 'employee_id', 'department', 'position');
            }])
            ->when($search, function ($query, $search) {
                $words = preg_split('/[\s\/]+/', trim($search), -1, PREG_SPLIT_NO_EMPTY);

                $query->where(function ($q) use ($words) {
                    foreach ($words as $word) {
                        $q->where(function ($subQ) use ($word) {
                            $subQ->where('name', 'like', "%{$word}%")
                                ->orWhereHas('employment', function ($empQ) use ($word) {
                                    $empQ->where('position', 'like', "%{$word}%");
                                })
                                ->orWhereHas('employment', function ($deptQ) use ($word) {
                                    $deptQ->where('department', 'like', "%{$word}%");
                                });
                        });
                    }
                });
            })
            ->select([
                'id',
                'staff_number',
                'name',
                'gender',
                'nrc_state',
                'nrc_township',
                'nrc_type',
                'nrc_number',
                'father_name',
            ])
            ->latest()
            ->paginate(10)
            ->withQueryString();
    }

 
    public function findWithRelations(int $id)
    {
        return Employee::with([
            'physical', 'info', 'employment', 'educations', 'trainings',
            'familyMembers', 'foreignVisitedPurpose', 'courtDisciplinaryActions',
            'criminalRecords', 'serviceRecords', 'awardsReceived', 'abroadVisits', 'referee'
        ])->findOrFail($id);
    }

 
    public function checkStaffNumber(string $staffNumber)
    {
        return Employee::where('name', $staffNumber)->first();
    }

 
    public function create(array $data)
    {
        return Employee::create($data);  
    }

   
    public function update(int $id, array $validated)
    {
        $employee = Employee::findOrFail($id);
        
        $employee->update($validated);
 
        $employee->physical()->updateOrCreate(['employee_id' => $employee->id], $validated);
        $employee->info()->updateOrCreate(['employee_id' => $employee->id], $validated);
        $employee->employment()->updateOrCreate(['employee_id' => $employee->id], $validated);
        $employee->foreignVisitedPurpose()->updateOrCreate(['employee_id' => $employee->id], $validated);
        $employee->referee()->updateOrCreate(['employee_id' => $employee->id], $validated);
         
        if (isset($validated['educations'])) {
            $filteredEducations = array_filter($validated['educations'], fn($item) => !empty($item['degree_name']));
            $keepIds = collect($filteredEducations)->pluck('id')->filter()->toArray();
            $employee->educations()->whereNotIn('id', $keepIds)->delete();
            foreach ($filteredEducations as $edu) {
                $employee->educations()->updateOrCreate(['id' => $edu['id'] ?? null], $edu);
            }
        } else {
            $employee->educations()->delete();
        }
 
        if (isset($validated['trainings'])) {
            $filteredTrainings = array_filter($validated['trainings'], fn($item) => !empty($item['learn_course']));
            $keepIds = collect($filteredTrainings)->pluck('id')->filter()->toArray();
            $employee->trainings()->whereNotIn('id', $keepIds)->delete();
            foreach ($filteredTrainings as $training) {
                $employee->trainings()->updateOrCreate(['id' => $training['id'] ?? null], $training);
            }
        } else {
            $employee->trainings()->delete();
        }
 
        if (isset($validated['service_records'])) {
            $filteredRecords = array_filter($validated['service_records'], fn($item) => !empty($item['service_position']));
            $keepIds = collect($filteredRecords)->pluck('id')->filter()->toArray();
            $employee->serviceRecords()->whereNotIn('id', $keepIds)->delete();
            foreach ($filteredRecords as $record) {
                $employee->serviceRecords()->updateOrCreate(['id' => $record['id'] ?? null], $record);
            }
        } else {
            $employee->serviceRecords()->delete();
        }
 
        if (isset($validated['families'])) {
            $filteredFamilies = array_filter($validated['families'], fn($item) => !empty($item['relation_name']));
            $keepIds = collect($filteredFamilies)->pluck('id')->filter()->toArray();
            $employee->familyMembers()->whereNotIn('id', $keepIds)->delete();
            foreach ($filteredFamilies as $family) {
                $employee->familyMembers()->updateOrCreate(['id' => $family['id'] ?? null], $family);
            }
        } else {
            $employee->familyMembers()->delete();
        }
 
        if (isset($validated['legal_records'])) {
            $filteredLog = array_filter($validated['legal_records'], fn($item) => !empty($item['reason']));
            $keepIds = collect($filteredLog)->pluck('id')->filter()->toArray();
            $employee->courtDisciplinaryActions()->whereNotIn('id', $keepIds)->delete();
            foreach ($filteredLog as $log) {
                $employee->courtDisciplinaryActions()->updateOrCreate(['id' => $log['id'] ?? null], $log);
            }
        } else {
            $employee->courtDisciplinaryActions()->delete();
        }
 
        if (isset($validated['awards'])) {
            $filteredAwards = array_filter($validated['awards'], fn($item) => !empty($item['award_title']));
            $keepIds = collect($filteredAwards)->pluck('id')->filter()->toArray();
            $employee->awardsReceived()->whereNotIn('id', $keepIds)->delete();
            foreach ($filteredAwards as $award) {
                $employee->awardsReceived()->updateOrCreate(['id' => $award['id'] ?? null], $award);
            }
        } else {
            $employee->awardsReceived()->delete();
        }
 
        if (isset($validated['abroad_visits'])) {
            $filteredLog = array_filter($validated['abroad_visits'], fn($item) => !empty($item['country_visited']));
            $keepIds = collect($filteredLog)->pluck('id')->filter()->toArray();
            $employee->abroadVisits()->whereNotIn('id', $keepIds)->delete();
            foreach ($filteredLog as $log) {
                $employee->abroadVisits()->updateOrCreate(['id' => $log['id'] ?? null], $log);
            }
        } else {
            $employee->abroadVisits()->delete();
        }

        return $employee;
    }
 
    public function delete(int $id)
    {
        $employee = Employee::findOrFail($id);
        return $employee->delete();
    }
}