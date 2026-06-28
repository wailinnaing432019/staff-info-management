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
            ->orderBy('created_at', 'asc')
            ->paginate(10)
            ->withQueryString();
    }


    public function findWithRelations(int $id)
    {
        return Employee::with([
            'physical',
            'info',
            'employment',
            'educations',
            'trainings',
            'familyMembers',
            'foreignVisitedPurpose',
            'courtDisciplinaryActions',
            'criminalRecords',
            'serviceRecords',
            'awardsReceived',
            'abroadVisits',
            'referee',
            'pastJobs',
            'details'
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
        $employee->details()->updateOrCreate(['employee_id' => $employee->id], $validated);


        if (isset($validated['educations'])) {
            $filteredEducations = $this->filterRelationData($validated['educations'], ['category']); // category ပါလာလျှင် ignore လုပ်ရန်
            $keepIds = collect($filteredEducations)->pluck('id')->filter()->toArray();
            $employee->educations()->whereNotIn('id', $keepIds)->delete();
            foreach ($filteredEducations as $edu) {
                $employee->educations()->updateOrCreate(['id' => $edu['id'] ?? null], $edu);
            }
        } else {
            $employee->educations()->delete();
        }

        if (isset($validated['trainings'])) {
            $filteredTrainings = $this->filterRelationData($validated['trainings'], ['category']);
            $keepIds = collect($filteredTrainings)->pluck('id')->filter()->toArray();
            $employee->trainings()->whereNotIn('id', $keepIds)->delete();
            foreach ($filteredTrainings as $training) {
                $employee->trainings()->updateOrCreate(['id' => $training['id'] ?? null], $training);
            }
        } else {
            $employee->trainings()->delete();
        }

        if (isset($validated['service_records'])) {
            $filteredRecords = $this->filterRelationData($validated['service_records']);
            $keepIds = collect($filteredRecords)->pluck('id')->filter()->toArray();
            $employee->serviceRecords()->whereNotIn('id', $keepIds)->delete();
            foreach ($filteredRecords as $record) {
                $employee->serviceRecords()->updateOrCreate(['id' => $record['id'] ?? null], $record);
            }
        } else {
            $employee->serviceRecords()->delete();
        }

        if (isset($validated['families'])) {
            $filteredFamilies = $this->filterRelationData($validated['families'], ['relationship_type']);
            $keepIds = collect($filteredFamilies)->pluck('id')->filter()->toArray();
            $employee->familyMembers()->whereNotIn('id', $keepIds)->delete();
            foreach ($filteredFamilies as $family) {
                $employee->familyMembers()->updateOrCreate(['id' => $family['id'] ?? null], $family);
            }
        } else {
            $employee->familyMembers()->delete();
        }

        if (isset($validated['legal_records'])) {
            $filteredLog = $this->filterRelationData($validated['legal_records'], ['record_type']);
            $keepIds = collect($filteredLog)->pluck('id')->filter()->toArray();
            $employee->courtDisciplinaryActions()->whereNotIn('id', $keepIds)->delete();
            foreach ($filteredLog as $log) {
                $employee->courtDisciplinaryActions()->updateOrCreate(['id' => $log['id'] ?? null], $log);
            }
        } else {
            $employee->courtDisciplinaryActions()->delete();
        }

        if (isset($validated['awards'])) {
            $filteredAwards = $this->filterRelationData($validated['awards']);
            $keepIds = collect($filteredAwards)->pluck('id')->filter()->toArray();
            $employee->awardsReceived()->whereNotIn('id', $keepIds)->delete();
            foreach ($filteredAwards as $award) {
                $employee->awardsReceived()->updateOrCreate(['id' => $award['id'] ?? null], $award);
            }
        } else {
            $employee->awardsReceived()->delete();
        }

        if (isset($validated['criminal_records'])) {
            $filteredLog = $this->filterRelationData($validated['criminal_records']);
            $keepIds = collect($filteredLog)->pluck('id')->filter()->toArray();
            $employee->criminalRecords()->whereNotIn('id', $keepIds)->delete();
            foreach ($filteredLog as $log) {
                $employee->criminalRecords()->updateOrCreate(['id' => $log['id'] ?? null], $log);
            }
        } else {
            $employee->criminalRecords()->delete();
        }

        if (isset($validated['abroad_visits'])) {
            $filteredLog = $this->filterRelationData($validated['abroad_visits']);
            $keepIds = collect($filteredLog)->pluck('id')->filter()->toArray();
            $employee->abroadVisits()->whereNotIn('id', $keepIds)->delete();
            foreach ($filteredLog as $log) {
                $employee->abroadVisits()->updateOrCreate(['id' => $log['id'] ?? null], $log);
            }
        } else {
            $employee->abroadVisits()->delete();
        }

        if (isset($validated['past_jobs'])) {
            $filteredLog = $this->filterRelationData($validated['past_jobs'], ['type', 'category']);
            $keepIds = collect($filteredLog)->pluck('id')->filter()->toArray();
            $employee->pastJobs()->whereNotIn('id', $keepIds)->delete();
            foreach ($filteredLog as $log) {
                $employee->pastJobs()->updateOrCreate(['id' => $log['id'] ?? null], $log);
            }
        } else {
            $employee->pastJobs()->delete();
        }

        return $employee;
    }

    public function delete(int $id)
    {
        $employee = Employee::findOrFail($id);
        return $employee->delete();
    }


    private function filterRelationData(array $data, array $extraIgnoreKeys = []): array
    {
        $baseIgnoreKeys = ['id', 'employee_id', 'created_at', 'updated_at'];
        $ignoreKeys = array_merge($baseIgnoreKeys, $extraIgnoreKeys);

        return array_filter($data, function ($item) use ($ignoreKeys) {
            $filledFields = array_filter($item, function ($value, $key) use ($ignoreKeys) {
                return !in_array($key, $ignoreKeys) && !empty($value);
            }, ARRAY_FILTER_USE_BOTH);

            return !empty($filledFields);
        });
    }
}
