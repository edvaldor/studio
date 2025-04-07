<?php
header('Content-Type: application/json');

// Configurações
$uploadDir = 'uploads/edronet-studio/';
$maxFileSize = 500 * 1024 * 1024; // 500MB
$allowedTypes = ['video/webm', 'audio/webm'];

// Criar diretório se não existir
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

try {
    // Verificar se há arquivo
    if (!isset($_FILES['file'])) {
        throw new Exception('Nenhum arquivo enviado');
    }

    $file = $_FILES['file'];

    // Verificar erros
    if ($file['error'] !== UPLOAD_ERR_OK) {
        throw new Exception('Erro no upload: ' . $file['error']);
    }

    // Verificar tamanho
    if ($file['size'] > $maxFileSize) {
        throw new Exception('Arquivo muito grande. Máximo permitido: 500MB');
    }

    // Verificar tipo
    if (!in_array($file['type'], $allowedTypes)) {
        throw new Exception('Tipo de arquivo não permitido. Apenas .webm');
    }

    // Gerar nome do arquivo
    $timestamp = date('Y-m-d-H-i');
    $filename = "edvaldo-tech-{$timestamp}.webm";
    $filepath = $uploadDir . $filename;

    // Mover arquivo
    if (!move_uploaded_file($file['tmp_name'], $filepath)) {
        throw new Exception('Erro ao salvar arquivo');
    }

    // Retornar sucesso
    echo json_encode([
        'success' => true,
        'message' => 'Arquivo enviado com sucesso',
        'filename' => $filename
    ]);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>