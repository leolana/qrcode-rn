import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import {
  Container, Content, List, ListItem, Body, Left, Text, Icon,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Header from './Header';

const Profile = ({ member, logout }) => (
  <Container>
    <Content>
      <List>
        {(member && member.email)
          ? (
            <View>
              <Content padder>
                <Header
                  title={`Hi ${member.firstName},`}
                  content={`Você está logado como ${member.email}`}
                />
              </Content>

              <ListItem onPress={Actions.updateProfile} icon>
                <Left>
                  <Icon name="person-add" />
                </Left>
                <Body>
                  <Text>
                    Atualizar meu perfil
                  </Text>
                </Body>
              </ListItem>
              <ListItem onPress={() => logout().then(() => Actions.login())} icon>
                <Left>
                  <Icon name="power" />
                </Left>
                <Body>
                  <Text>
                    Sair
                  </Text>
                </Body>
              </ListItem>
            </View>
          )
          : (
            <View>
              <Content padder>
                <Header
                  title="Oi de novo,"
                  content="Por favor se logue para ganhar pontuação extra"
                />
              </Content>

              <ListItem onPress={Actions.login} icon>
                <Left>
                  <Icon name="power" />
                </Left>
                <Body>
                  <Text>
                    Entrar
                  </Text>
                </Body>
              </ListItem>
              <ListItem onPress={Actions.signUp} icon>
                <Left>
                  <Icon name="add-circle" />
                </Left>
                <Body>
                  <Text>
                    Cadastrar-se
                  </Text>
                </Body>
              </ListItem>
              <ListItem onPress={Actions.forgotPassword} icon>
                <Left>
                  <Icon name="help-buoy" />
                </Left>
                <Body>
                  <Text>
                    Esqueceu sua senha?
                  </Text>
                </Body>
              </ListItem>
            </View>
          )
        }
        <ListItem onPress={Actions.locale} icon>
          <Left>
            <Icon name="ios-flag" />
          </Left>
          <Body>
            <Text>
              Alterar idioma
            </Text>
          </Body>
        </ListItem>
      </List>
    </Content>
  </Container>
);

Profile.propTypes = {
  member: PropTypes.shape({}),
  logout: PropTypes.func.isRequired,
};

Profile.defaultProps = {
  member: {},
};

export default Profile;
