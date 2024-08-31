const fs = require('fs');
const CountingContext = require('./context');
const {
  ByteCountStrategy,
  LineCountStrategy,
  WordCountStrategy,
  CharCountStrategy,
} = require('./strategies');

// Main function to process file or stdin
function processFile(filePath, options) {
  const fileStream = getFileStream(filePath);
  readData(fileStream, (data) => handleData(data, options, filePath));
}

// Get file stream from file path or stdin
function getFileStream(filePath) {
  return filePath ? fs.createReadStream(filePath) : process.stdin;
}

// Read data from file stream and execute callback on end
function readData(fileStream, onDataRead) {
  let data = '';

  fileStream.on('data', (chunk) => {
    data += chunk;
  });

  fileStream.on('end', () => {
    onDataRead(data);
  });

  fileStream.on('error', handleError);
}

// Handle the data processing and output results
function handleData(data, options, filePath) {
  const context = new CountingContext();
  const results = calculateResults(data, options, context);
  outputResults(results, filePath);
}

// Calculate results based on provided options
function calculateResults(data, options, context) {
    const results = [];
  
    const strategies = {
      bytes: ByteCountStrategy,
      lines: LineCountStrategy,
      words: WordCountStrategy,
      chars: CharCountStrategy,
    };
  
    // Check each option and execute the corresponding strategy
    for (const option in strategies) {
      if (options[option]) {
        const StrategyClass = strategies[option];
        results.push(executeStrategy(new StrategyClass(), context, data));
      }
    }
  
    // Default case when no specific option is provided
    if (!options.bytes && !options.lines && !options.words && !options.chars) {
      // Default options to display when none are provided
      const defaultStrategies = [LineCountStrategy, WordCountStrategy, ByteCountStrategy];
      for (const StrategyClass of defaultStrategies) {
        results.push(executeStrategy(new StrategyClass(), context, data));
      }
    }
  
    return results;
  }
  

// Execute strategy using the context
function executeStrategy(strategy, context, data) {
  context.setStrategy(strategy);
  return context.executeStrategy(data);
}

// Output results to console
function outputResults(results, filePath) {
  console.log(`${results.join(' ')} ${filePath || ''}`);
}

// Handle errors during file read
function handleError(error) {
  console.error(`Error reading file: ${error.message}`);
  process.exit(1);
}

module.exports = processFile;
