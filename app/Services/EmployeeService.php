<?php

namespace App\Services;

use App\Repositories\Contracts\EmployeeRepositoryInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class EmployeeService
{
    protected $employeeRepo;

  
    public function __construct(EmployeeRepositoryInterface $employeeRepo)
    {
        $this->employeeRepo = $employeeRepo;
    }

    public function getPaginatedEmployees($request)
    {
        return $this->employeeRepo->paginateWithFilters($request);
    }

    public function getEmployeeWithFormats(int $id)
    {
        return $this->employeeRepo->findWithRelations($id);
    }

    public function checkStaffNumber(string $staffNumber)
    {
        return $this->employeeRepo->checkStaffNumber($staffNumber);
    }

 
    public function createEmployee(array $storeData, $imageFile = null)
    {
        return DB::transaction(function () use ($storeData, $imageFile) {
            if ($imageFile) {
                $path = $imageFile->store('employees', 'public');
                $storeData['image_path'] = $path;
            } else {
                unset($storeData['image_path']);
            }

            $employee = $this->employeeRepo->create($storeData);
            
            
            $employee->physical()->create($storeData);
            $employee->info()->create($storeData);
            $employee->employment()->create($storeData);
            $employee->foreignVisitedPurpose()->create($storeData);
            $employee->referee()->create($storeData);

            if (!empty($storeData['educations'])) $employee->educations()->createMany($storeData['educations']);
            if (!empty($storeData['trainings'])) $employee->trainings()->createMany($storeData['trainings']);
            if (!empty($storeData['service_records'])) $employee->serviceRecords()->createMany($storeData['service_records']);
            if (!empty($storeData['families'])) $employee->familyMembers()->createMany($storeData['families']);
            if (!empty($storeData['abroad_visits'])) $employee->abroadVisits()->createMany($storeData['abroad_visits']);
            if (!empty($storeData['awards'])) $employee->awardsReceived()->createMany($storeData['awards']);
            if (!empty($storeData['legal_records'])) $employee->courtDisciplinaryActions()->createMany($storeData['legal_records']);
            if (!empty($storeData['criminal_records'])) $employee->criminalRecords()->createMany($storeData['criminal_records']);

            return $employee;
        });
    }

     
    public function updateEmployee(int $id, array $data, $imageFile = null)
    {
        $employee = $this->employeeRepo->findWithRelations($id);
        $oldImagePath = $employee->info->image_path ?? null;
        $path = null;

        if ($imageFile) {
            $path = $imageFile->store('employees', 'public');
            $data['image_path'] = $path;
        }

        DB::beginTransaction();
        try {
            $updatedEmployee = $this->employeeRepo->update($id, $data);

            DB::commit();

       
            if ($imageFile && $oldImagePath && Storage::disk('public')->exists($oldImagePath)) {
                Storage::disk('public')->delete($oldImagePath);
            }

            return $updatedEmployee;
        } catch (\Exception $e) {
            DB::rollBack();
            if ($path && Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
            }
            throw $e;
        }
    }

    public function deleteEmployee(int $id)
    {
        return $this->employeeRepo->delete($id);
    }
}