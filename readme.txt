<script>
                      async function checkOtp() {
                        console.log("callallas");
                        let id = document.getElementById('ids').value;
                        let otp = document.getElementById('otp').value;
                        let qry_req = await fetch(`/forgot-password/checkOtp`, {
                          method: 'post',
                          headers: {
                            'Content-type': 'application/json',
                          },
                          body: JSON.stringify({
                            otp,
                            id,
                          }),
                        });
                        let result = await qry_req.json();
                        if (result) {
                          let u_id = result.user_id;
                          document.getElementById('show').style.display = 'none';
                          let htmlContent = '';
                          htmlContent +=
                            `<div class="container">
              <form class="row g-3 needs-validation" action="/forgot-password/reset-Password" method="post">
                  <div class="row g-3 align-items-center">
                      <div class="col-auto">
                          <label for="inputPassword6"  class="col-form-label">Password</label>
                        </div>
                        <div class="col-auto">
                          <input type="password" name="password" id="pwd" class="form-control" aria-labelledby="passwordHelpInline">
                        </div>
                      </div>
                <div class="row g-3 align-items-center">
                  <div class="col-auto">
                    <label for="inputPassword6" class="col-form-label"
                      >Confirm Password</label
                    >
                  </div>
                  <div class="col-auto">
                    <input
                      type="password"
                      name="cpassword"
                      id="cpwd"
                      class="form-control"
                      aria-labelledby="passwordHelpInline"
                      onmouseout="return validation()"
                    />
                  </div>
                </div>
                <div id="error"></div>
                <input type="text" value=${u_id} id="u_id" name="u_id" >
                <div class="col-12">
                  <input type="submit" class="btn btn-primary" />
                </div>
              </div>
            </body>`
            document.getElementById('reset').innerHTML = htmlContent;
          }
        }
          </script>

          <script>
                  async function validation() {
                    const password = document.getElementById('pwd').value;
                    const cpassword = document.getElementById('cpwd').value;
                    if (password != cpassword) {
                      document.getElementById('error').innerHTML =
                        'Confirm password must be same as password';
                      return false;
                    } else {
                      document.getElementById('error').innerHTML = '';
                    }
                  };
            
          </script>