import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { EmployeeService } from './Employee/employee-service.service';
import { Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';

export function duplicateIdValidator(employeeService: EmployeeService): ValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null>=> {
    if (control.value != null && control.value.length == 6)
    {
         employeeService
                .checkIfEmployeeIdExists(control.value).subscribe((value)=>{
                    //return of(value.some((a) => a === control.value))
                    console.log(value);
                    for(let i=0;i<value.length;i++)
                    {
                        if(value[i]==control.value)
                        {
                            console.log("false");
                            return { duplicateEmployeeId: true }
                        }
                    }
                    console.log("true");
                    return null;
                }
                );
                // .pipe(
                //   map((result: boolean) =>
                //     result ? { duplicateEmployeeId: true } : null
                //   )
                // );
    }
    return new Observable<null>();
    //   employeeService.getEmployeeIds().subscribe((value: string[]) => {
    //     if (
    //       control.value !== undefined &&
    //       (isNaN(control.value) || value.indexOf(control.value) != -1)
    //     ) {
    //       console.log('true');
    //       return { duplicateEmployeeId: true };
    //     }
    //     console.log('false');
    //     return null;
    //   });

  };
}
