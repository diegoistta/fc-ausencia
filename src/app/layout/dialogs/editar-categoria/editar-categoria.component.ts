import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit {

  form: FormGroup;
  id: number;
  descricao: string;
  nome: string;

  constructor(private fb: FormBuilder,
    private dialog: MatDialogRef<EditarCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) { descricao, id, nome }) {

    this.descricao = descricao;
    this.id = id;
    this.nome = nome;

    this.form = this.fb.group({
      id: [this.id, []],
      nome: [this.nome, []]
    });
  }

  ngOnInit() {
  }

  save() {
    this.dialog.close(this.form.value);
  }

  close() {
    this.dialog.close();
  }

}
