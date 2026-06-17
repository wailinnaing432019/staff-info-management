<?php

namespace App\Http\Controllers\staff;

use App\Http\Controllers\Controller;
use App\Services\EmployeeService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StaffController extends Controller
{
    protected $employeeService;

    public function __construct(EmployeeService $employeeService)
    {
        $this->employeeService = $employeeService;
    }

    public function index(Request $request)
    {
        $employees = $this->employeeService->getPaginatedEmployees($request);

        return Inertia::render('Staff/Index', [
            'employees' => $employees,
            'filters' => $request->only(['search'])
        ]);
    }

    public function checkStaffNumber(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
        ]);

        $employee = $this->employeeService->checkStaffNumber($request->name);

        if ($employee) {
            return response()->json(['id' => $employee->id], 200);
        }

        return response()->json(['message' => 'ဤဝန်ထမ်းအမှတ်ဖြင့် ဝန်ထမ်းရှာမတွေ့ပါ'], 404);
    }

    public function create()
    {
        return inertia('Staff/Create');
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'image_path' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            ]);

            $imageFile = $request->hasFile('image_path') ? $request->file('image_path') : null;

            $this->employeeService->createEmployee($request->all(), $imageFile);

            return redirect()->route('employees.index')
                ->with('success', 'ဝန်ထမ်းအချက်အလက်အားလုံးကို အောင်မြင်စွာ သိမ်းဆည်းပြီးပါပြီ။');
        } catch (Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'ဒေတာသိမ်းဆည်းစဉ် ပြဿနာတစ်ခုဖြစ်ပွားခဲ့ပါသည်- ' . $e->getMessage());
        }
    }

    public function show($id)
    { 
        $employeeData = $this->employeeService->getEmployeeWithFormats($id);
 
        return Inertia::render('Staff/Show', [
            'employeeData' => $employeeData
        ]);
    }

    public function format18Pdf($id)
    { 
        $employeeData = $this->employeeService->getEmployeeWithFormats($id);
 
        return Inertia::render('Staff/pdf/Format18Pdf', [
            'data' => $employeeData
        ]);
    }

    public function format36Pdf($id)
    { 
        $employeeData = $this->employeeService->getEmployeeWithFormats($id);
 
        return Inertia::render('Staff/pdf/Format36Pdf', [
            'data' => $employeeData
        ]);
    }

    public function format25Pdf($id)
    { 
        $employeeData = $this->employeeService->getEmployeeWithFormats($id);
 
        return Inertia::render('Staff/pdf/Format25Pdf', [
            'data' => $employeeData
        ]);
    }

    public function edit($id)
    {
        $employee = $this->employeeService->getEmployeeWithFormats($id);

        return Inertia::render('Staff/Edit', [
            'employee' => $employee
        ]);
    }

    public function update(Request $request, $id)
    {
        try {
            if ($request->hasFile('image_path')) {
                $request->validate([
                    'image_path' => 'image|mimes:jpeg,png,jpg,webp|max:2048',
                ]);
            }

            $imageFile = $request->hasFile('image_path') ? $request->file('image_path') : null;
            
            $this->employeeService->updateEmployee($id, $request->all(), $imageFile);

            return redirect()->route('employees.index')
                ->with('success', 'ဝန်ထမ်း၏ အချက်အလက်စုံလင် Mega Form ကို အောင်မြင်စွာ ပြင်ဆင်ပြီးပါပြီဗျာ။');
        } catch (Exception $e) { 
            return redirect()->back()
                ->withInput()
                ->withErrors(['error' => 'အချက်အလက်များ သိမ်းဆည်းစဉ် စနစ်ချို့ယွင်းမှုတစ်ခု ဖြစ်ပွားခဲ့ပါသည်။ ကျေးဇူးပြု၍ ထည့်သွင်းထားသော အချက်အလက်များ မှန်ကန်မှု ရှိ/ မရှိ ပြန်လည်စစ်ဆေးပေးပါဗျာ။']);
        }
    }

    public function format25Page(Request $request)
    {
 
        $employees = \App\Models\Employee::with([
                'physical', 'info', 'employment', 'educations', 'trainings',
                'familyMembers', 'foreignVisitedPurpose', 'courtDisciplinaryActions',
                'criminalRecords', 'serviceRecords', 'awardsReceived', 'abroadVisits'
            ])
            ->orderBy('staff_number', 'asc')  
            ->get(); 

        return Inertia::render('Staff/Format25Page', [
            'employees' => $employees
        ]);
    }

    public function destroy($id)
    {
        $this->employeeService->deleteEmployee($id);
        return redirect()->route('employees.index')->with('success', 'ဝန်ထမ်းကို ဒေတာဘေ့စ်ထဲမှ ပယ်ဖျက်ပြီးပါပြီ။');
    }
}