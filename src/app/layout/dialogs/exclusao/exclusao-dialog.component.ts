import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import * as moment from 'moment';

@Component({
    selector: 'app-exclusao-dialog',
    templateUrl: './exclusao-dialog.component.html',
    styleUrls: ['./exclusao-dialog.component.scss']
})
export class ExclusaoDialogComponent implements OnInit {

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<ExclusaoDialogComponent>,
        @Inject(MAT_DIALOG_DATA){ } ) { }

    ngOnInit() {

    }

    save() {
        this.dialogRef.close(true);
    }

    close() {
        this.dialogRef.close();
    }

}
