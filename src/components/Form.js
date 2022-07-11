import React, { useRef } from "react";
import {useForm} from'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

export default function Form(){

    const formSchema = Yup.object().shape({

        nom: Yup.string()
            .required('Veuillez renseignez un nom'),
        prenom: Yup.string()
            .required('Veuillez renseignez un prenom'),
        email: Yup.string()
            .email('Veuillez mettre un email valide')
            .required('Email est obligatoire'),
        password: Yup.string()
            .required('Le mot de passe est obligatoire')
            .min(6, 'Le mot de passe doit contenir minimum 6 caratères'),
        confirmPwd: Yup.string()
            .required('Le mot de passe est obligatoire')
            .oneOf([Yup.ref('password')], 'Les mots de passe ne correspondent pas'),
      })
    const formOptions = { resolver: yupResolver(formSchema) }
    const {register, handleSubmit, formState, reset} = useForm(formOptions)
    const { errors } = formState
    console.log(errors);

    return(
        <section>
            <div className='register'>
                <div className='col-1'>
                    <h2>Formulaire d'inscription</h2>
                    <span>Compléter le formulaire ci-dessous</span>

                    <form id='form' className='flex flex-col' onSubmit={handleSubmit()}>
                        <input name="nom" type="text" {...register("nom")}
                        className={`form-control ${errors.nom ? 'is-invalid' : ''}`} 
                        placeholder='nom'/>
                        <div className="invalid-feedback">{errors.nom?.message}</div>

                        <input name="prenom" type="text" {...register("prenom")}
                        className={`form-control ${errors.prenom ? 'is-invalid' : ''}`} 
                        placeholder='prenom'/>
                        <div className="invalid-feedback">{errors.prenom?.message}</div>

                        <input name="email" type="text" {...register("email")} 
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        placeholder='email'/>
                        <div className="invalid-feedback">{errors.email?.message}</div>

                        <input name="password" type="password" {...register('password')}
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        placeholder='mot de passe'/>
                        <div className="invalid-feedback">{errors.password?.message}</div>

                        <input name="confirmPwd" type="password" {...register('confirmPwd')} 
                        className={`form-control ${errors.confirmPwd ? 'is-invalid' : ''}`}
                        placeholder='confirmer le mot de passe'/>
                        <div className="invalid-feedback">{errors.confirmPwd?.message}</div>

                        <button type='submit' className='btn'>Sign In</button>
                    </form>
                </div>
            </div>
        </section>
    )
}