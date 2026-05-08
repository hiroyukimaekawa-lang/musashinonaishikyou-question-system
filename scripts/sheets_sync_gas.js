/**
 * 武蔵野内視鏡クリニック向け患者アンケートシステム用 GAS
 *
 * 設定手順:
 * 1. 新しいGoogleスプレッドシートを作成。
 * 2. 拡張機能 > Apps Script を開く。
 * 3. このコードを貼り付けて保存。
 * 4. デプロイ > 新しいデプロイ をクリック。
 * 5. 「ウェブアプリ」を選択、アクセスできるユーザーを「全員」にする。
 * 6. ウェブアプリのURLをコピーして、環境変数の EXPO_PUBLIC_GAS_URL に設定。
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // JSONデータのパース
    var data = JSON.parse(e.postData.contents);
    
    if (!data) {
      return createJsonResponse({ error: "No data" }, 400);
    }

    // ヘッダーがなければ追加する（初回のみ実行される）
    if (sheet.getLastRow() === 0) {
      var headers = [
        "回答日時",
        "患者様のお名前",
        "検査種別",
        "以前受診有無",
        "検査苦痛",
        "医師説明",
        "待ち時間",
        "看護師対応",
        "受付対応",
        "次回利用意向",
        "推奨意向",
        "来院理由",
        "自由記述"
      ];
      sheet.appendRow(headers);
    }

    // データの追記 (指定された順序で配列を作成)
    var rowData = [
      data.submittedAt,
      data.patientName,
      data.examType,
      data.previousExam,
      data.examPain,
      data.doctorExplanation,
      data.waitingTime,
      data.nurseResponse,
      data.receptionResponse,
      data.nextTime,
      data.recommend,
      Array.isArray(data.reason) ? data.reason.join(", ") : data.reason,
      data.comments || ""
    ];
    
    sheet.appendRow(rowData);

    return createJsonResponse({ success: true, message: "Successfully appended data." });
  } catch (error) {
    return createJsonResponse({ success: false, error: error.message }, 500);
  }
}

function doOptions(e) {
  // CORSプリフライトリクエスト用
  return createJsonResponse({ message: "CORS preflight successful" });
}

function createJsonResponse(data, statusCode = 200) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
}
