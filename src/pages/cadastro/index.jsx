import React from 'react'
import { Column, Container, Row, Wrapper, TitleCadastro, Title, SubtitleCadastro, CriarText, ContaText } from './styles'
import { useForm } from 'react-hook-form';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { MdEmail, MdLock, MdPerson } from 'react-icons/md';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export default function Cadastro() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    })

    const navigate = useNavigate()
    const onSubmit = async (formData) => {
        try {
            const data = await api.post('/users', formData)
            if (data.status === 201) {
                navigate('/login', { replace: true })
            }
        } catch (error) {
            alert('Erro ao cadastrar', error)
        }
    }

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                    <TitleCadastro>Comece agora grátis</TitleCadastro>
                    <SubtitleCadastro>Crie sua conta e make the change._</SubtitleCadastro>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input placeholder="Nome completo" leftIcon={<MdPerson />} name="nome" control={control} />
                        {errors.nome && <span>Nome é obrigatório</span>}
                        <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email" control={control} />
                        {errors.email && <span>E-mail é obrigatório</span>}
                        <Input type="password" placeholder="Password" leftIcon={<MdLock />} auto-complete = "new-password" name="senha" control={control} />
                        {errors.senha && <span>Senha é obrigatório</span>}

                        <Button title="Criar minha conta" variant="secondary" type="submit" />
                    </form>
                    <Column>
                        <SubtitleCadastro>
                            Ao clicar em "criar minha conta grátis", declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.
                        </SubtitleCadastro>
                        <Row>
                            <ContaText>
                                Já tenho conta.
                            </ContaText>
                            <CriarText href="/login">Fazer login</CriarText>
                        </Row>
                    </Column>
                </Wrapper>
            </Column>
        </Container>
    </>
    )
}
