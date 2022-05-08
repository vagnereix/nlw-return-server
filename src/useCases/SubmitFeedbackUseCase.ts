import { MailAdapter } from "../adapters/MailAdapter";
import { FeedbacksRepository } from "../repositories/FeedbacksRepository";

export interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute({ type, comment, screenshot }: SubmitFeedbackUseCaseRequest) {
    if(!type) {
      throw new Error('Type is required');
    }
    if(!comment) {
      throw new Error('Comment is required');
    }
    if(screenshot && !screenshot.startsWith('data:image/png;base64,')) {
      throw new Error('Invalid screenshot format.');
    }
    
    await this.feedbacksRepository.create({ type, comment, screenshot });
    await this.mailAdapter.sendMail({
      subject: "Novo Feedback",
      body: 
        `
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            height="100%"
            width="100%"
            class="body"
            style="
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
              mso-table-lspace: 0;
              mso-table-rspace: 0;
              border-collapse: collapse;
              border-spacing: 0;
              table-layout: fixed;
              min-width: 100%;
              width: 100% !important;
              color: #0a0836;
              font-family: -apple-system, Roboto, sans-serif;
              font-size: 14px;
              line-height: 1.5;
              margin: 0;
              padding: 0;
            "
            bgcolor="#f6fafb"
          >
            <tr style="padding: 0">
              <td
                align="center"
                valign="top"
                class="email-container"
                style="
                  -ms-text-size-adjust: 100%;
                  -webkit-text-size-adjust: 100%;
                  mso-table-lspace: 0;
                  mso-table-rspace: 0;
                  border-collapse: collapse !important;
                  -webkit-hyphens: auto;
                  hyphens: auto;
                  word-break: break-word;
                  min-width: 100%;
                  width: 100% !important;
                  margin: 0;
                  padding: 20px 10px 30px;
                "
              >
                <table
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="580"
                  class="email-body"
                  style="
                    -ms-text-size-adjust: 100%;
                    -webkit-text-size-adjust: 100%;
                    mso-table-lspace: 0;
                    mso-table-rspace: 0;
                    border-collapse: collapse;
                    border-spacing: 0;
                    table-layout: auto;
                    border-radius: 10px;
                    padding: 0;
                    font-family: -apple-system, Roboto, sans-serif;
                  "
                  bgcolor="#fff"
                >
                  <!-- Content -->
                  <tr style="padding: 0">
                    <td
                      align="left"
                      valign="top"
                      class="content"
                      style="
                        -ms-text-size-adjust: 100%;
                        -webkit-text-size-adjust: 100%;
                        mso-table-lspace: 0;
                        mso-table-rspace: 0;
                        border-collapse: collapse !important;
                        -webkit-hyphens: auto;
                        hyphens: auto;
                        word-break: break-word;
                        padding: 30px 40px;
                      "
                    >
                      <h1
                        style="
                          word-break: normal;
                          font-size: 18px;
                          font-weight: 700;
                          line-height: 21px;
                          padding-bottom: 10px;
                          margin: 0;
                        "
                      >
                        Olá, recebemos um novo feedback!
                      </h1>
                      <br />
                      <p
                        style="
                          -ms-text-size-adjust: 100%;
                          -webkit-text-size-adjust: 100%;
                          font-size: 14px;
                          padding-bottom: 10px;
                          margin: 0;
                        "
                      >
                        Tipo do feedback: <strong>${type}</strong>
                      </p>
                      <p
                        style="
                          -ms-text-size-adjust: 100%;
                          -webkit-text-size-adjust: 100%;
                          font-size: 14px;
                          padding-bottom: 10px;
                          margin: 0;
                        "
                      >
                        Conteúdo do feedback: ${comment}
                      </p>
                      <br />
                      <h2
                        style="
                          word-break: normal;
                          font-size: 16px;
                          font-weight: 700;
                          padding-bottom: 15px;
                          margin: 0;
                        "
                      >
                        Screenshot:
                      </h2>
                      <a
                        target="_blank"
                        rel="noopener noreferer"
                        href=${screenshot}
                        style="
                          -ms-text-size-adjust: 100%;
                          -webkit-text-size-adjust: 100%;
                          color: #00b08c !important;
                        "
                      >
                        <img
                          alt="Screenshot"
                          title="Screenshot"
                          src=${screenshot}
                          style="
                            -ms-interpolation-mode: bicubic;
                            max-width: 100%;
                            width: 130px !important;
                            outline: none;
                            text-decoration: none;
                            height: 38px !important;
                            vertical-align: middle;
                            border: none;
                          "
                        />
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        `
    });
  }
}
