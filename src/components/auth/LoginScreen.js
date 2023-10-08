import React from 'react';

export const LoginScreen = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="container login-container">
          <div className="row">
              <div className="col-md-5 login-form-1">
                  <h3>Ingreso</h3>
                  <form>
                      <div className="mb-3">
                          <input 
                              type="text"
                              className="form-control"
                              placeholder="Correo"
                          />
                      </div>
                      <div className="mb-3">
                          <input
                              type="password"
                              className="form-control"
                              placeholder="Contraseña"
                          />
                      </div>
                      <div className="mb-3">
                          <input 
                              type="submit"
                              className="btnSubmit"
                              value="Login" 
                          />
                      </div>
                  </form>
              </div>

              <div className="col-md-5 login-form-2">
                  <h3>Registro</h3>
                  <form>
                      <div className="mb-3">
                          <input
                              type="text"
                              className="form-control"
                              placeholder="Nombre"
                          />
                      </div>
                      <div className="mb-3">
                          <input
                              type="email"
                              className="form-control"
                              placeholder="Correo"
                          />
                      </div>
                      <div className="mb-3">
                          <input
                              type="password"
                              className="form-control"
                              placeholder="Contraseña" 
                          />
                      </div>

                      <div className="mb-3">
                          <input
                              type="password"
                              className="form-control"
                              placeholder="Repita la contraseña" 
                          />
                      </div>

                      <div className="mb-3">
                          <input 
                              type="submit" 
                              className="btnSubmit" 
                              value="Crear cuenta" />
                      </div>
                  </form>
              </div>
          </div>
      </div>
    </div>
  );
};
