import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Content, Text, Form, Item, Label, Input, Button,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Messages from './Messages';
import Header from './Header';
import Spacer from './Spacer';

class SignUp extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password2: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val,
    });
  }

  handleSubmit = () => {
    const { onFormSubmit } = this.props;
    onFormSubmit(this.state)
      .then(() => Actions.login())
      .catch(e => console.log(`Error: ${e}`));
  }

  render() {
    const { loading, error } = this.props;

    if (loading) return <Loading />;

    return (
      <Container>
        <Content padder>
          <Header
            title="Bem-vindo"
            content="Pedimos abaixo algumas informações para criarmos o seu acesso"
          />

          {error && <Messages message={error} />}

          <Form>
            <Item stackedLabel>
              <Label>
                Primeiro Nome
              </Label>
              <Input onChangeText={v => this.handleChange('firstName', v)} />
            </Item>

            <Item stackedLabel>
              <Label>
                Sobrenome
              </Label>
              <Input onChangeText={v => this.handleChange('lastName', v)} />
            </Item>

            <Item stackedLabel>
              <Label>
                Email
              </Label>
              <Input
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={v => this.handleChange('email', v)}
              />
            </Item>

            <Item stackedLabel>
              <Label>
                Senha
              </Label>
              <Input secureTextEntry onChangeText={v => this.handleChange('password', v)} />
            </Item>

            <Item stackedLabel>
              <Label>
                Confirme a senha
              </Label>
              <Input secureTextEntry onChangeText={v => this.handleChange('password2', v)} />
            </Item>

            <Spacer size={20} />

            <Button block onPress={this.handleSubmit}>
              <Text>
                Cadastrar-se
              </Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default SignUp;
