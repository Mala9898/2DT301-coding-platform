use messages_actix::MessageApp;
use std::env;

fn main() {
    // std::set_var("RUST_LOG", "actix_web=info");
    env_logger::init();
    let app = MessageApp::new(8080);
    app.run();
}
